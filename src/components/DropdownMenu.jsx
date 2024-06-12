import { useState, forwardRef } from "react";
import { Dropdown, Popover, Whisper, IconButton } from "rsuite";
import { FaRegUser } from "react-icons/fa";

const RenderMenu = forwardRef(
  ({ close, left, top, className, content }, ref) => {
    const handleSelect = (eventKey) => {
      if (eventKey === "signOut") {
        close(false); // Close the menu when sign out is selected
        localStorage.removeItem("jwtToken");
      }
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
            <p>Signed in as</p>
            <strong>{content}</strong>
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item>Purchase item</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item eventKey="signOut">Sign out</Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  }
);
const DropdownMenu = ({ profile, close }) => {
  return (
    <Whisper
      placement="bottomEnd"
      trigger="click"
      speaker={<RenderMenu content={profile} close={close} />}
      enterable
    >
      <IconButton icon={<FaRegUser />} className="icon-button-hover" circle />
    </Whisper>
    // <div className="test">{profile}</div>
  );
};

export default DropdownMenu;
