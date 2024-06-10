"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Role, Type } from "@/lib/types";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

import { loginUserApiFunction, signupUserApiFunction } from "@/lib/utils/apiFunctions";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/store/slices/userSlice";
import Cookie from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(Role.USER);
  const [isSubmit, setIsSubmit] = useState(false);
  const [type, setType] = useState(Type.LOGIN);
  const dispatch = useDispatch();
  const { toast } = useToast();

   async function submitHandler() {
    console.log("submitHandler");
    try {
      if (Type.LOGIN == type) {
        console.log("login type");
        // if (email.length <= 7 || password.length <= 7) {
        if (email.length == 0 || password.length == 0) {
          toast({
            title: "Kindly add all fields",
            description: "Some input fields are not valid!",
          });
        } else {
          setIsSubmit(true);
          const res = await loginUserApiFunction(email, password, role);
          console.log(res);

          dispatch(
            setUser({
              userId: res.userId,
              email: res.email,
              username: res.username,
              isLogin: true,
              isAuth: res.isAuth,
              role: res.role,
            })
          );
          const user_credentials = {
            email: res.email,
            password: password,
            role: res.role,
          };
          Cookie.set("user_credentials", JSON.stringify(user_credentials));
          setIsSubmit(false);
        }
      }else if (Type.SIGNUP == type){
        console.log("signup type");
        if (username.length == 0|| email.length == 0 || password.length == 0) {
          toast({
            title: "Kindly add all fields",
            description: "Some input have short len!",
          });
        } else {
          setIsSubmit(true);
          const res = await signupUserApiFunction(username, email, password, role);
          console.log(res);

          dispatch(
            setUser({
              userId: res.userId,
              email: res.email,
              username: res.username,
              isLogin: true,
              isAuth: res.isAuth,
              role: res.role,
            })
          );
          const user_credentials = {
            email: res.email,
            password: password,
            role: res.role,
          };
          Cookie.set("user_credentials", JSON.stringify(user_credentials));
          setIsSubmit(false);
      }}
    } catch (error) {
      console.log({ error });
      setIsSubmit(false);
    }
  }


  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">LogIn</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] pt-10">
        <Tabs value={type} className="w-full">
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value={Type.LOGIN} onClick={() => setType(Type.LOGIN)}>
              Log In
            </TabsTrigger>
            <TabsTrigger
              value={Type.SIGNUP}
              onClick={() => setType(Type.SIGNUP)}
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value={Type.LOGIN}>
            <Card>
              <CardContent className="space-y-2 py-4">
                <div className="space-y-1">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jondoe@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                  />
                </div>
                <div className="flex items-center justify-evenly pt-3 pb-2">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => setRole(Role.USER)}
                  >
                    <Checkbox id="terms" checked={role == Role.USER && true} />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      User{" "}
                    </label>
                  </div>
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => setRole(Role.MANAGER)}
                  >
                    <Checkbox checked={role == Role.MANAGER && true} />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Manger{" "}
                    </label>
                  </div>
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => setRole(Role.ADMIN)}
                  >
                    <Checkbox checked={role == Role.ADMIN && true} />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Admin
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={isSubmit} onClick={submitHandler}>
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value={Type.SIGNUP}>
            <Card>
              <CardContent className="space-y-2 py-4">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="JonDoe"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jondoe@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="jondoe@example.com"
                  />
                </div>

                <div className="flex items-center justify-evenly pt-3 pb-2">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => setRole(Role.USER)}
                  >
                    <Checkbox id="terms" checked={role == Role.USER && true} />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      User{" "}
                    </label>
                  </div>
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => setRole(Role.MANAGER)}
                  >
                    <Checkbox checked={role == Role.MANAGER && true} />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Manger{" "}
                    </label>
                  </div>
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => setRole(Role.ADMIN)}
                  >
                    <Checkbox checked={role == Role.ADMIN && true} />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Admin
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={isSubmit} onClick={submitHandler}>
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
