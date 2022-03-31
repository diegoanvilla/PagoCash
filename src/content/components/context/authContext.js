import React, { useContext, useState, useEffect } from "react";
import firebase, { auth, firestore } from "../../../utils/firebase";
import { runTransaction } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";
const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [userName, setUserName] = useState();
  const [userMainWallet, setUserMainWallet] = useState();
  const [loading, setLoading] = useState(true);
  const logIn = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password).then(() => {
        setTimeout(() => {
          navigate("/session");
        }, 1000);
      });
    } catch (err) {
      throw err;
    }
  };
  const signIn = async (email, password, nombre, userName, telefono) => {
    try {
      return await auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (user) => {
          await firebase
            .firestore()
            .collection("users")
            .doc(user.user.uid)
            .set({
              nombre,
              telefono,
              userName,
            })
            .then((user) => {
              navigate("/session");
            })
            .catch((err) => {
              user.user.delete();
              alert("un error ha ocurrido");
            });
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const setNewMainWallet = async (wallet) => {
    var walletDocRef = firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("wallets")
      .doc(wallet);
    var oldMainWalletRef = firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("wallets")
      .doc(userMainWallet.wallet);
    try {
      await runTransaction(firebase.firestore(), async (transaction) => {
        const newWalletDoc = await transaction.get(walletDocRef);
        transaction.update(walletDocRef, { main: true });
        transaction.update(oldMainWalletRef, { main: false });
        setUserMainWallet(newWalletDoc.data());
      });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const getOperacion = (type) => {
    console.log(type);
    return firebase.firestore().collection(type).get();
  };

  const getUserWallets = async () => {
    return await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("wallets")
      .orderBy("main", "desc")
      .get();
  };

  const getMainUserWallet = async (user) => {
    try {
      return await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("wallets")
        .where("main", "==", true)
        .get();
    } catch (err) {
      console.log(err);
    }
  };

  const getUserName = async (user) => {
    return await (
      await firebase.firestore().collection("users").doc(user.uid).get()
    ).data().userName;
  };

  const addNewWallet = async (wallet) => {
    const matchName = await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("wallets")
      .where("name", "==", wallet.name)
      .get();
    const matchWallet = await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("wallets")
      .where("wallet", "==", wallet.wallet)
      .get();
    const matchMain = await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("wallets")
      .where("main", "==", true)
      .get();

    if (!matchName.empty) throw { message: "Nombre de Wallet ya existe" };
    if (!matchWallet.empty) throw { message: "Wallet ya existe" };
    console.log(matchMain.empty);
    await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("wallets")
      .doc(wallet.wallet)
      .set({
        name: wallet.name,
        wallet: wallet.wallet,
        main: matchMain.empty,
      })
      .then(() => {
        return true;
      })
      .catch((err) => {
        throw err;
      });
  };

  const setUserMain = async (user) => {
    await (
      await getMainUserWallet(user)
    ).forEach((wallet) => setUserMainWallet(wallet.data()));
  };

  const logOut = () => {
    navigate("/access?form=0");
    window.location.reload();
    return auth.signOut();
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        await setUserMain(user);
        setUserName(await getUserName(user));
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userName,
    userMainWallet,
    logIn,
    logOut,
    signIn,
    addNewWallet,
    getUserWallets,
    setNewMainWallet,
    getOperacion,
    setUserMain,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loading noBackground={true} /> : children}
    </AuthContext.Provider>
  );
}
