"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="profileImage" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

import {
  CreditCard,
  Keyboard,
  LogOut,
  LogIn,
  Settings,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/store/slices/userSlice";
import { Role } from "@/lib/types";
import { navbarList } from "./Navbar";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { setShowLoginDialog } from "@/lib/store/slices/mixSlice";


export function ProfileAvatar() {
  const dispatch = useDispatch();
  const router = useRouter()
  
  const isLogin = useAppSelector(state=>state.userReducer.value.isLogin)
  const profileImage = useAppSelector(state=>state.userReducer.value.profileImage)



  


  function logoutHandler() {
    Cookie.remove("user_credentials");
    dispatch(
      setUser({
        userId: null,
        email: null,
        username: null,
        isLogin: false,
        isAuth: false,
        role: Role.USER,
      })
    );
    router.refresh()
  }
  function loginHandler() {
    dispatch(setShowLoginDialog(true))
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={profileImage} alt="profileImage" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        
      <DropdownMenuGroup className="flex flex-col md:hidden">
          {navbarList.map(({ link, name }, _) => (
            <Link href={link} key={_}>
              <DropdownMenuLabel>{name}</DropdownMenuLabel>
            </Link>
          ))}
        </DropdownMenuGroup>        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={isLogin?logoutHandler:loginHandler}>
        {
            isLogin?
            <>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            </>:
            <>
             <LogIn className="mr-2 h-4 w-4" />
             <span>Log In</span>
            </>
          }
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
