<template>
    <div class="admin-post-page">
        <section class="update-form">
            <admin-post-form></admin-post-form>
        </section>
    </div>
</template>
<script>
import AdminPostForm from '@/components/admin/AdminPostForm';
export default {
    layout: 'admin',
    components: {
        AdminPostForm,
    },
    data() {
        return {
            loadedPost: {
                author: 'meluhan',
                title: 'My awesome post',
                content: 'Super amazing,thanks for that',
            }
        }
    }
}
</script>
<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>