export default function(context) {
    console.log("[Middlware]: check-auth middleware running");
    if (process.client) {
        context.store.dispatch('initAuth', null);
    } else {
        context.store.dispatch('initAuth', context.req);
    }
}