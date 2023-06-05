const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      notification: undefined,
      usuarios: [],
      favoritos: [],
      clientes: [],
      tareas: [],
      comentarios: [],
      clientActivity: [],
    },
    actions: {
      
      // Use getActions to call a function within a fuction
      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };

        try {
          const resp = await fetch(`${process.env.BACKEND_URL}/token`, opts);
          if (resp.status !== 200) {
            const mensaje = await resp.json();
            alert(mensaje.msg);
            return false;
          } 
          const data = await resp.json();
          console.log("Esto vino del backend", data);
          sessionStorage.setItem("token", data.access_token);
          console.log(data);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error("Hubo un error al hacer login in");
        }
      },
      syncTokenFromSessionStore: () => {
        const actions = getActions();
        const token = sessionStorage.getItem("token");
        console.log(
          "La aplicacion acaba de cargar, sincronizando el token de session storage"
        );
        if (token && token != "" && token != undefined) {
          setStore({ token: token });
        } else {
          actions.logout();
        }
      },

      signup: async (name, lastname, email, password, role) => {
        const store = getStore();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            role: role,
          }),
        };

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/user`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            alert(danger);
            return false;
          }

          const data = await response.json();
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("There has been an error login in from the backend");
        }
      },

      postClientes: async ({
        nombre,
        fecha,
        email,
        celular,
        monto,
        estatus,
        confianza,
        notas,
      }) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({
            nombre: nombre,
            fecha: fecha,
            email: email,
            celular: celular,
            monto: monto,
            estatus: estatus,
            confianza: confianza,
            notas: notas,
          }),
        };
        console.log(
          nombre,
          fecha,
          email,
          celular,
          monto,
          estatus,
          confianza,
          notas
        );
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/clientes`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getClientes();
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("Ha habido un error al registrar al cliente", error);
        }
      },

      getClientes: () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/clientes`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ clientes: body }))
          .catch((error) => console.log(error));
      },

      putCliente: async ({
        estatus, cliente_id
      }) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({
            estatus: estatus,
          }),
        };
        console.log(
          estatus,
        );
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/cliente/${cliente_id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getClientes();
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("Ha habido un error al cambiar es estatus del cliente desde el backend", error);
        }
      },

      updateClientStatus: (newList) => {
        setStore({ clientes: newList });
      },

        calcularEdad:(fecha) => {
        let hoy = new Date();
        let fechaDeNacimiento = new Date(fecha);
        let edad = hoy.getFullYear() - fechaDeNacimiento.getFullYear();
        let m = hoy.getMonth() - fechaDeNacimiento.getMonth();
    
        if (m < 0 || (m === 0 && hoy.getDate() < fechaDeNacimiento.getDate())) {
            edad--;
        }
    
        return edad;
    },

      logout: () => {
        const store = getStore();
        sessionStorage.removeItem("token");
        console.log("Se han borrado todos los tokens", store.token);
        setStore({ token: null });
      },

      setNotification: (mensaje) => {
        setStore({ notification: mensaje });
        setTimeout(() => {
          setStore({ notification: undefined });
        }, 10000);
      },

      setClientes: (nombre) => {
        setStore({ notification: mensaje });
        setTimeout(() => {
          setStore({ notification: undefined });
        }, 10000);
      },
      
      // obtener y agregar tareas
      postTareas: async ({
        tarea,
        estatus,
      }) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({
            tarea: tarea,
            estatus: estatus,
          }),
        };
        console.log(
          tarea,
          estatus,
        );
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/tareas`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getTareas();
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("Ha habido un error al registrar la tarea, problemas con el backend", error);
        }
      },

      getTareas: () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/tareas`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ tareas: body }))
          .catch((error) => console.log(error));
      },

      updateTaskStatus: (newList) => {
        setStore({ tareas: newList });
      },

      putTarea: async ({
        estatus, id
      }) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({
            estatus: estatus,
          }),
        };
        console.log(
          estatus,
        );
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/tarea/${id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getTareas();
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("Ha habido un error al cambiar es estatus del cliente desde el backend", error);
        }
      },

      deleteTarea: async (
        id
      ) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${store.token}`,
          },
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/tareas/${id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getTareas();
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("Ha habido un error al cambiar es estatus del cliente desde el backend", error);
        }
      },

      // obtener y agregar comentarios
      postComentarios: async (
        data, video_id
      ) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(data),
        };
        console.log(data);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/comments/${video_id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getComentarios(video_id);
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("Ha habido un error al registrar el comentario, problemas con el backend", error);
        }
      },

      getComentarios: (id) => {
        console.log(id);
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/comments/${id}`;
        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ comentarios: body }))
          .catch((error) => console.log(error));
      },

      // obtener y agregar registros de actividad a clientes
      postClientActivity: async (
        activity, client_id
      ) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(activity)
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/client_activity/${client_id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getClientActivity(client_id);
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("Ha habido un error al registrar la actividad del cliente, problemas con el backend", error);
        }
      },

      getClientActivity: (client_id) => {
        console.log(client_id);
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/client_activity/${client_id}`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ clientActivity: body }))
          .catch((error) => console.log(error));
      },
    },
  };
};

export default getState;
