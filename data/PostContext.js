import React, { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [misRetinas, setRetinas] = useState([]);

  const addRetinas = async (post) => {
    try {
      const result = await fetch("http://localhost:5000/api/posts", { // LE PEGO A NODE
        method: "POST",
        headers: {
          "Content-Type": "application/json", // info para el backend
        },
        body: JSON.stringify(post), // Enviar el post como JSON al backend
      });

      if (result.ok) {
        const postCreado = await result.json();
        setRetinas([...misRetinas, postCreado]);
      } else {
        alert("Error en la creación del post");
      }
    } catch (error) {
      console.error("Error en la creación del post", error);
    }
  };

  const eliminarRetina = (postId) => {
    setRetinas(misRetinas.filter((retina) => retina.id !== postId));
    return "Post eliminado de favoritos";
  };

  return (
    <PostContext.Provider
      value={{
        misRetinas,
        addRetinas,
        eliminarRetina,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};