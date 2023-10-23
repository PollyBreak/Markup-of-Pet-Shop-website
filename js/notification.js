document.addEventListener('DOMContentLoaded', function() {
  const button = document.querySelector('.funnybutton');

  button.addEventListener('click', (e)=>{
    e.preventDefault();
    button.innerHTML='Well done 🐇';
    let permission = Notification.permission;
    if(permission === "granted"){ //if user allows notifications
      showNotification();
    } else if(permission === "default"){
      requestAndShowPermission(); //ask permissions
    } else {
      alert('Unfortunately, you do not allow notifications =(');
    }
    function requestAndShowPermission() {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          showNotification();
        }
      });
    }
    function showNotification() {
      let title = "PetFriends";
      let icon = "logo.png";
      let body = "Have a good day! Thank you for attention 🐈";
      let notification = new Notification(title, { body, icon });//creating of notification
      notification.onclick = () => {
        notification.close();
        window.parent.focus(); //after closing the notification focuses on the page
      }
    }
  })

})

