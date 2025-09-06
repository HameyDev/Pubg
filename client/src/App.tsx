import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/pages/home";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import NotFound from "@/pages/not-found";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
