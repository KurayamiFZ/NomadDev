import Auther from "../components/Auth";

export default function Login() {
  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center bg-background bg-fixed"
      style={{
        backgroundImage: `
      radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,40,180,0.3), transparent),
      radial-gradient(ellipse 80% 80% at -10% 100%, rgba(170,100,180,0.3), transparent),
      radial-gradient(ellipse 80% 80% at 110% 100%, rgba(170,100,180,0.3), transparent)
    `,
      }}
    >
      <Auther />
    </div>
  );
}
