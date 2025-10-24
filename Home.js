 //  mobile menu
 function toggleMenu() {
     document.getElementById("navLinks").classList.toggle("active");
 }

 // Display username from login
 const username = localStorage.getItem("username");
 if (username) {
     document.getElementById("welcome").textContent = `Hi, ${username}!`;
 } else {
     window.location.href = "login.html";
 }

 // Logout function
 function logout() {
     localStorage.removeItem("username");
     window.location.href = "login.html";
 }


 //  <!-- ⚙️ Small JavaScript for toggling -->

 function toggleResources(id) {
     const section = document.getElementById(id);
     section.style.display = section.style.display === "block" ? "none" : "block";
 }

 //contact
 const form = document.getElementById('contactForm');
 const successMsg = document.getElementById('successMsg');

 form.addEventListener('submit', function(e) {
     e.preventDefault();
     successMsg.style.display = 'block';
     form.reset();
     setTimeout(() => {
         successMsg.style.display = 'none';
     }, 3000);
 });