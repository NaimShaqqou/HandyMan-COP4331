import React, {useState} from 'react';

function RegisterBox()
{
    const app_name='myhandyman1'
    function buildPath(route)
    {
      if (process.env.NODE_ENV === 'production')
      {
        return 'https://' + app_name + '.herokuapp.com/' + route;
      }
      else
      {
        return 'http://localhost:5000/' + route;
      }
    }

    var rloginName;
    var rloginPassword;

    const [message, setMessage] = useState('');

    const doRegister = async event => 
    {
      event.preventDefault();

      var obj = {login:rloginName.value,password:rloginPassword.value};
      var js = JSON.stringify(obj);

      setMessage("Register " + js);

      try
      {    
          const response = await fetch(buildPath('api/login'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
          var res = JSON.parse(await response.text());

          if( res.id <= 0 )
          {
              setMessage('User/Password combination incorrect');
          }
          else
          {
              var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
              localStorage.setItem('user_data', JSON.stringify(user));
              setMessage('');
              window.location.href = '/cards';
          }
      }
      catch(e)
      {
          console.log(e.toString());
          return;
      }    
  };

  return (
    <div className="loginbox">
      <h3>Create an Account</h3>
      <form onSubmit={doRegister}>
        <input type="text" id="rloginName" placeholder="Username" ref={(c) => rloginName = c} /><br />
        <input type="password" id="rloginPassword" placeholder="Password" ref={(c => rloginPassword = c)} /><br />
        <input type="submit" id="registerButton" className="buttons" value="Register" onClick={doRegister} />
      </form>
      <span id="registerResult">{message}</span>
    </div>
  );
};

export default RegisterBox;