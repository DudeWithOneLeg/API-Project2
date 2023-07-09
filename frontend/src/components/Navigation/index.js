import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProfileButton from './ProfileButton';
import OpenModalText from "../OpenModalText";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './index.css'

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  //const dispatch = useDispatch()

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
          <Link to='/groups/new'>Start a new group</Link>
          <ProfileButton user={sessionUser} />
      </>

    );
  } else {
    sessionLinks = (
      <div id='login-signup'>
        <OpenModalText
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalText
          id='login'
          buttonText="Sign up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    );
  }

  return (
    <div id='nav'>

      <NavLink id='home' exact to="/">Run Up</NavLink>

      {isLoaded && sessionLinks}

    </div>
  );
}
