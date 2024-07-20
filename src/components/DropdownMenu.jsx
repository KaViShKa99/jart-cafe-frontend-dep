import { useState, forwardRef, useEffect } from "react";
import { Dropdown, Popover, Whisper, IconButton } from "rsuite";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../redux/reducers/userProfileReducer";
const RenderMenu = forwardRef(({ close, left, top, className }, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.userProfile);
  const handleSelect = (eventKey) => {
    if (eventKey === "signOut") {
      // close(false);
      dispatch(signOut());
      navigate("/");

      // localStorage.removeItem("jwtToken");
    }
    if (eventKey === "ordered") {
      // close(false);
      navigate("/ordered-items");
    }
  };

  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
          <p>Signed in as</p>
          <strong>{userProfile.name}</strong>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item eventKey="ordered">Ordered item</Dropdown.Item>
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
      // speaker={<RenderMenu close={close} />}
      speaker={<RenderMenu />}
      enterable
    >
      <IconButton icon={<FaRegUser />} className="icon-button-hover" circle />
    </Whisper>
  );
};

export default DropdownMenu;
