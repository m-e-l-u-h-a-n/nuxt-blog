<template>
  <div class="admin-new-post">
    <section class="new-post-form">
      <admin-post-form @submit="onSubmitted"></admin-post-form>
    </section>
  </div>
</template>
<script>
// import AdminPostForm from "@/components/admin/AdminPostForm";
import axios from "axios";
export default {
  layout: "admin",
  // components: {
  //   AdminPostForm
  // },
  methods: {
    onSubmitted(postData) {
      this.$store.dispatch('addPost',postData).then(() => {this.$router.push('/admin');})
    }
  },
  middleware: ['check-auth','auth'],
};
</script>
<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>