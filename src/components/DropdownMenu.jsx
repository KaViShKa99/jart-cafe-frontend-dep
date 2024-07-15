import { useState, forwardRef, useEffect } from "react";
import { Dropdown, Popover, Whisper, IconButton } from "rsuite";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const RenderMenu = forwardRef(({ close, left, top, className }, ref) => {
  const { userProfile } = useSelector((state) => state.userProfile);
  const handleSelect = (eventKey) => {
    if (eventKey === "signOut") {
      close(false);
      localStorage.removeItem("jwtToken");
    }
  };

  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
          <p>Signed in as</p>
          {/* <strong>{content}</strong> */}
          <strong>{userProfile.name}</strong>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>Purchase item</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item eventKey="signOut">Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
});
const DropdownMenu = ({ profile, close }) => {
  return (
    <Whisper
      placement="bottomEnd"
      trigger="click"
      speaker={<RenderMenu close={close} />}
      // speaker={<RenderMenu content={profile} close={close} />}
      enterable
    >
      <IconButton icon={<FaRegUser />} className="icon-button-hover" circle />
    </Whisper>
  );
};

export default DropdownMenu;
