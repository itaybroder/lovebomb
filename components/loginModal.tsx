import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import LoginForm from "@/components/LoginForm"
import { Button } from "./ui/button";
interface IProps {};

const LoginDialog:FC<IProps> = (props) => {
    return (
         <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Sign in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-full">
        <LoginForm />
      </DialogContent>
    </Dialog>
    )
};

export default LoginDialog;