"use client";
import { ActionSignUp } from "@/actions/actionsAuth/ActionSignUp";
import { GoogleAuthButton } from "@/components/Auth/GoogleAuthButton";
import { setServerErrors } from "@/helpers/helpersValidation/setServerErrors";
import { useToast } from "@/hooks/use-toast";
import { TSignUpShema, signUpSchema } from "@/lib/schema/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputsText from "../inputs/inputsText";




const dataInputsSignUp = [
  {
    label: "Nazwa",
    name: "name",
    placeholder: "Jan",
    type: "text",
  },
  {
    label: "Email",
    name: "email",
    placeholder: "email@com",
    type: "email",
  },
   {
    label: "Hasło",
    name: "password",
    placeholder: "xxxxx",
    type: "text",
  },
  {
    label: "Powtórz hasło",
    name: "confirmPassword",
    placeholder: "xxxxx",
    type: "text",
  },
];


const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TSignUpShema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: TSignUpShema) => {
    try {
      const resp = await ActionSignUp(null, data);
      if (resp?.error) {
        setServerErrors<TSignUpShema>(resp.error, setError);
        return;
      }

        toast({
            title: "Account created",
            description:
              "your account has been created check your email for confirmation",
          })
    } catch (err: any) {
      toast({
        title: "Błąd zapisu",
        description: err.message || "Coś poszło nie tak",
        variant: "destructive",
      });
    }

    // form.reset();
    // await authClient.signUp.email(
    //   {
    //     email: data.email,
    //     password: data.password,
    //     name: data.name,
    //   },
    //   {
    //     onRequest: () => {
    //       setPending(true);
    //     },
    //     onSuccess: () => {
    //       toast({
    //         title: "Account created",
    //         description:
    //           "your account has been created check your email for confirmation",
    //       });
    //     },
    //     onError: (ctx) => {
    //       toast({
    //         variant: "destructive",
    //         title: "something went wrong",
    //         description: ctx.error.message ?? "something went wrong.",
    //       });
    //     },
    //   }
    // );
    // setPending(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="w-full max-w-md">
 
          
            <h1 className="text-2xl font-bold text-center">
              Zakładasz konto
            </h1>
    
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                 <InputsText
                inputsData={dataInputsSignUp}
                register={register}
                errorMsg={errors}
              />
              
           

                <button
                type="submit"
                className="w-full bg-red-100 flex"
                disabled={isSubmitting}
              >
                {isSubmitting ? <>Please wait...</> : <>Zapisz</>}
              </button>
              </form>
       
        
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>

            <div className="flex gap-4 ">
              <GoogleAuthButton
                action="signup"
                buttonText="Zaloguj się z Google"
                redirectTo="/dashboard"
              />
            </div>

            <div className="text-center text-sm">
              Masz konto?{" "}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Zaloguj się
              </Link>
            </div>
          </div>
      
      </div>
    </div>
  );
};

export default SignUp;



// "use client";
// import { InputField } from "@/components/Auth/FormFields";
// import { GoogleAuthButton } from "@/components/Auth/GoogleAuthButton";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Form } from "@/components/ui/form";
// import { useToast } from "@/hooks/use-toast";
// import { authClient } from "@/lib/auth-client";
// import { TSignUpShema, signUpSchema } from "@/lib/schema/signupSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ArrowRight, Loader2, Lock, Mail, User } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

// const Signup = () => {
//   const form = useForm<TSignUpShema>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });
//   const [pending, setPending] = useState(false);
//   const { toast } = useToast();



//   const onSubmit = async (data: TSignUpShema) => {
//     form.reset();
//     await authClient.signUp.email(
//       {
//         email: data.email,
//         password: data.password,
//         name: data.name,
//       },
//       {
//         onRequest: () => {
//           setPending(true);
//         },
//         onSuccess: () => {
//           toast({
//             title: "Account created",
//             description:
//               "your account has been created check your email for confirmation",
//           });
//         },
//         onError: (ctx) => {
//           toast({
//             variant: "destructive",
//             title: "something went wrong",
//             description: ctx.error.message ?? "something went wrong.",
//           });
//         },
//       }
//     );
//     setPending(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
//       <div className="w-full max-w-md">
//         <Card className="border-none shadow-lg">
//           <CardHeader className="space-y-1">
//             <CardTitle className="text-2xl font-bold text-center">
//               Zakładasz konto
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-4"
//               >
//                 <InputField
//                   control={form.control}
//                   name="name"
//                   label="Imię i nazwisko"
//                   placeholder="Jan kowalski"
//                   type="text"
//                   icon={<User className="h-5 w-5 text-muted-foreground" />}
//                 />

//                 <InputField
//                   control={form.control}
//                   name="email"
//                   label="Email"
//                   placeholder="john.doe@example.com"
//                   type="email"
//                   icon={<Mail className="h-5 w-5 text-muted-foreground" />}
//                 />

//                 <InputField
//                   control={form.control}
//                   name="password"
//                   label="Hasło"
//                   placeholder="••••••••"
//                   type="password"
//                   icon={<Lock className="h-5 w-5 text-muted-foreground" />}
//                   showPasswordToggle={true}
//                 />

//                 <InputField
//                   control={form.control}
//                   name="confirmPassword"
//                   label="Powtórz hasło"
//                   placeholder="••••••••"
//                   type="password"
//                   icon={<Lock className="h-5 w-5 text-muted-foreground" />}
//                   showPasswordToggle={true}
//                 />

//                 <Button type="submit" className="w-full" disabled={pending}>
//                   {pending ? (
//                     <>
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       Please wait...
//                     </>
//                   ) : (
//                     <>
//                       Zapisz <ArrowRight className="h-4 w-4" />
//                     </>
//                   )}
//                 </Button>
//               </form>
//             </Form>
//           </CardContent>
//           <CardFooter className="flex flex-col space-y-4">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <span className="w-full border-t" />
//               </div>
//             </div>

//             <div className="flex gap-4 ">
//               <GoogleAuthButton
//                 action="signup"
//                 buttonText="Zaloguj się z Google"
//                 redirectTo="/dashboard"
//               />
//             </div>

//             <div className="text-center text-sm">
//               Masz konto?{" "}
//               <Link
//                 href="/login"
//                 className="font-medium text-primary underline-offset-4 hover:underline"
//               >
//                 Zaloguj się
//               </Link>
//             </div>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Signup;
