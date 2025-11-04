import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDVmaxT3n1EjNzkGyOKU7Whc4vE0L3mvoE",
    authDomain: "login-form-cd837.firebaseapp.com",
    projectId: "login-form-cd837",
    storageBucket: "login-form-cd837.firebasestorage.app",
    messagingSenderId: "807549708279",
    appId: "1:807549708279:web:ded6402eee63fe2cbd30f2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.textContent = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => messageDiv.style.opacity = 0, 5000);
}

// Sign Up
document.getElementById('submitSignUp').addEventListener('click', async(e) => {
    e.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            email,
            firstName,
            lastName
        });

        showMessage('Account created successfully!', 'signUpMessage');
        window.location.href = 'index.html';
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            showMessage('Email already exists!', 'signUpMessage');
        } else {
            showMessage('Unable to create account.', 'signUpMessage');
        }
        console.error(error);
    }
});

// Sign In
document.getElementById('submitSignIn').addEventListener('click', async(e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        showMessage('Login successful!', 'signInMessage');
        localStorage.setItem('loggedInUserId', userCredential.user.uid);


        window.location.href = './Home.html';
    } catch (error) {
        console.error(error);
        if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            showMessage('Incorrect email or password.', 'signInMessage');
        } else if (error.code === 'auth/user-not-found') {
            showMessage('Account does not exist.', 'signInMessage');
        } else {
            showMessage('Login failed. Try again later.', 'signInMessage');
        }
    }

});