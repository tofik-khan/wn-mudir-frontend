import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

export const AuthProvider = ({ children }) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK;

  const navigate = useNavigate();

  const onRedirectCallback = async (appState) => {
    await navigate(appState.returnTo);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
