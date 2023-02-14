const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      notification: undefined,
      usuarios: [],
      favoritos: [],
      clientes: [],
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
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
          const resp = await fetch(
            `${process.env.BACKEND_URL}/api/token`,
            opts
          );
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
        const token = sessionStorage.getItem("token");
        console.log(
          "La aplicacion acaba de cargar, sincronizando el token de session storage"
        );
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },
      signup: async (name, lastname, phone, email, agency, password) => {
        const store = getStore();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            lastname: lastname,
            phone: phone,
            email: email,
            agency: agency,
            password: password,
          }),
        };

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/users`,
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
          console.error("There has been an error login in");
        }
      },

      postClientes: async ({
        nombre,
        fecha,
        email,
        celular,
        monto,
        confianza,
        notas,
      }) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre,
            fecha: fecha,
            email: email,
            celular: celular,
            monto: monto,
            confianza: confianza,
            notas: notas,
          }),
        };
        console.log(nombre, fecha, email, celular, monto, confianza, notas);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/clientes`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            alert(danger);
            return false;
          }

          const data = await response.json();
          actions.getClientes();
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("Ha habido un error al registrar al cliente");
        }
      },

      getClientes: () => {
        const apiURL = `${process.env.BACKEND_URL}/api/clientes`;

        fetch(apiURL)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ clientes: body }))
          .catch((error) => console.log(error));
      },

      updateClientStatus: (newList) => {
        setStore({ clientes: newList });
      },

      logout: () => {
        const token = sessionStorage.removeItem("token");
        console.log("Se han borrado todos los tokens");
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

      toggleFavorite: (item) => {
        const store = getStore();
        const actions = getActions();
        if (actions.isFavorite(item)) {
          const newfavoritos = store.favoritos.filter((fav) => {
            return fav !== item;
          });
          setStore({
            favoritos: newfavoritos,
          });
        } else {
          setStore({
            favoritos: [...store.favoritos, item],
          });
        }
      },
      isFavorite: (name) => {
        const store = getStore();
        return store.favoritos.find((favoritos) => {
          return favoritos == name;
        });
      },

      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
