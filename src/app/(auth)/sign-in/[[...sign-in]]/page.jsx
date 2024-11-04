// sign-in/page.jsx or wherever your sign-in page is located
import SignInClient from '../[[...sign-in]]/SignInClient'; // Adjust the path as necessary
import Link from 'next/link'; // Import Link from Next.js

const SignInPage = () => {
    return (
        <div>
            <h1>Sign In</h1>
            <SignInClient />
            <p>
                <Link href="/forgot-password">Forgot Password?</Link> {/* Adjust the href to match your routing */}
            </p>
        </div>
    );
};

export default SignInPage;
