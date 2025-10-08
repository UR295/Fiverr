// index.js — handles sign-in behavior for the demo site
(function(){
  'use strict';

  // Called from the sign-in form submit handler. On success, redirect to Spage.html
  function handleSignIn(event){
    event.preventDefault();
    const email = document.getElementById('signinEmail')?.value?.trim();
    const pass = document.getElementById('signinPassword')?.value?.trim();

    // Minimal demo validation
    if(!email || !pass){
      alert('Please enter email and password');
      return;
    }

    // Insert real auth here. For demo, we treat any non-empty credentials as success.
    console.log('Signing in (demo):', email);

    // Close modal if present
    const modal = document.getElementById('signinModal');
    if(modal) modal.classList.remove('show');

    // Redirect to Spage.html (relative to current file)
    window.location.href = './sinpage/Spage.html';
  }

  // Attach handler when DOM is ready
  document.addEventListener('DOMContentLoaded', function(){
    const signinForm = document.getElementById('signinForm');
    if(signinForm){
      signinForm.removeEventListener('submit', handleSignIn); // safe to call
      signinForm.addEventListener('submit', handleSignIn);
    }
    // Signup handler: demo validation then redirect to Spage.html
    function handleSignUp(event){
      event.preventDefault();
      const name = document.getElementById('signupName')?.value?.trim();
      const email = document.getElementById('signupEmail')?.value?.trim();
      const pass = document.getElementById('signupPassword')?.value?.trim();
      if(!name || !email || !pass){
        alert('Please fill all signup fields');
        return;
      }
      console.log('Signing up (demo):', email);
      const modal = document.getElementById('signupModal');
      if(modal) modal.classList.remove('show');
      // Redirect after signup to Spage.html (demo)
      window.location.href = './sinpage/Spage.html';
    }
    const signupForm = document.getElementById('signupForm');
    if(signupForm){
      signupForm.removeEventListener('submit', handleSignUp);
      signupForm.addEventListener('submit', handleSignUp);
    }
  });

})();
