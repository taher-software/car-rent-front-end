import React from 'react';
import { useSelector } from 'react-redux';

const Signin = () => {
  const users = useSelector((state) => state.Users);

  const handleSignin = (event) => {
    event.preventDefault();
    console.log(users);
    // const username = document.querySelector('.username').value;
  };

  return (
    <section>
      <form>

        Username:
        <input className="username" type="text" name="username" />

        <input type="submit" value="Log in" onClick={handleSignin} />
      </form>
    </section>
  );
};
export default Signin;
