import { DurableObjectNamespace, PagesFunction } from "@cloudflare/workers-types";
interface Env {
    COUNTER: DurableObjectNamespace;
}
export const onRequestPost: PagesFunction<Env> = async (context) => {
    const id = context.env.COUNTER.newUniqueId();
    // const counter = context.env.COUNTER.idFromName("A");
    const stub = context.env.COUNTER.get(id);
  
    // Pass the request down to the durable object
    return stub.fetch(context.request);
  }