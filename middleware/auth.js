export default function(context) {
    console.log('[Middleware]: auth middleware')
    if (!context.store.getters.isAuthenticated) {
        context.redirect('/admin/auth');
    }
}