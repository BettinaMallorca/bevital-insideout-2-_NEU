import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Kurse from "./pages/Kurse";
import UeberMich from "./pages/UeberMich";
import Angebote from "./pages/Angebote";
import Kontakt from "./pages/Kontakt";
import Minikurs from "./pages/Minikurs";
import Studio from "./pages/Studio";
import Admin from "./pages/Admin";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from './pages/AGB';
import Retreat from './pages/Retreat';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/kurse" component={Kurse} />
      <Route path="/ueber-mich" component={UeberMich} />
      <Route path="/angebote" component={Angebote} />
      <Route path="/kontakt" component={Kontakt} />
      <Route path="/minikurs" component={Minikurs} />
      <Route path="/studio" component={Studio} />
      <Route path="/admin" component={Admin} />
      <Route path="/impressum" component={Impressum} />
      <Route path="/datenschutz" component={Datenschutz} />
      <Route path="/agb" component={AGB} />
      <Route path="/retreat" component={Retreat} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
