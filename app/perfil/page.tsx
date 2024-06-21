'use client'
import React, { useState, useEffect } from "react";
import { Card, CardContent, TextField, Button, Avatar, IconButton, InputAdornment, CircularProgress } from "@mui/material";
import Header from "../components/header";
import { getLoggedUser, updateUser } from "../lib/actions/user-actions";
import { formatCPF } from "../utils/document-formatter";
import { IUser } from "../inteface";
import { toast } from "react-toastify";

export default function Perfil() {
  const [user, setUser] = useState<IUser>({
    id: "", // Provide a default value for the 'id' property
    name: "",
    document: "",
    birthDate: "",
    email: "",
    password: "", // Add the 'password' property with a default value
  });
  const [isLoading, setIsLoading] = useState(false)
  // const [previewImage, setPreviewImage] = useState(""); // For displaying the uploaded image

  // const handleImageChange = (event: any) => {
  //   const file = event.target.files[0];
  //   setPreviewImage(URL.createObjectURL(file));
  // };

  // Implement API call to update user data with profile picture (replace with your actual API call)
  // const handleProfileUpdate = async (event: any) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", user.name);
  //   formData.append("document", user.document);
  //   formData.append("birthDate", user.birthDate);
  //   formData.append("email", user.email);


  //   try {
  //     const response = await fetch("/api/user", {
  //       method: "PUT",
  //       body: formData,
  //     });
  //     if (response.ok) {
  //       // Handle successful update
  //       console.log("Profile updated successfully!");
  //     } else {
  //       // Handle error
  //       console.error("Error updating profile:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };

  const getUser = async () => {
    setIsLoading(true)
    const storedUser = localStorage.getItem('loggedUser') || '{}';
    const userEmail = JSON.parse(storedUser);
    try {
      await getLoggedUser(userEmail).then((user) => {
        if(user.error){
          console.log(user.error)
          return
        }
        setUser(user)      
      })     
    } catch (error) {
      console.error("Error getting user:", error);
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileUpdate = async (event: any) => {
    event.preventDefault();
  
    try {
      setIsLoading(true);
      const updatedUser: IUser = {
        ...user,
        name: event.target.elements.name.value,
        document: event.target.elements.document.value,
        birthDate: event.target.elements.birthDate.value,
        password: ""
      };
      const response = await updateUser(updatedUser);
      console.log('response: ', response)
      if (response.message.error) {
        console.error("Error updating profile:", response.error);
        toast.error("Error updating profile: " + response.error);
      } else {
        setUser(updatedUser);
        console.log("Profile updated successfully!");
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile: " + error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUser()
  }, [])
  return (
    <>
      <Header title="Perfil" />
      <div className="container mx-auto max-w-md">
        {isLoading ? (
          <>
            <div className="flex justify-center items-center min-h-screen">
              <CircularProgress />
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleProfileUpdate} className="flex flex-col gap-3">
                <div className="self-center">
                  {/* <Avatar
                    alt={user.name}
                    src={previewImage || user.profilePicture} // Use preview if available, otherwise use existing profile picture
                    sx={{ width: 100, height: 100, marginBottom: 2, bgcolor: blue[700] }}
                  /> */}
                  {/* <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'white',
                      padding: 5,
                    }}
                  >
                    <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                    <PhotoCamera />
                  </IconButton> */}
                </div>
                <TextField
                  name="name"
                  label="Nome"
                  value={user.name}
                  onChange={(event) => setUser({ ...user, name: event.target.value })}
                />
                <TextField
                  name="document"
                  label="CPF"
                  type="text"
                  value={formatCPF(user.document)}
                  inputProps={{ maxLength: 14 }} 
                  onChange={(event) => setUser({ ...user, document: event.target.value })}
                />
                <TextField
                  name="email"
                  label="Email"
                  value={user.email}
                  disabled 
                />
                <TextField
                  name="birthDate"
                  label="Data de Nascimento"
                  type="date"
                  value={user.birthDate}
                  onChange={(event) => setUser({ ...user, birthDate: event.target.value })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button type="submit" variant="contained" color="primary">Alterar Perfil</Button>
          </form>
          </>
        )}
      </div>
    </>
  );
}