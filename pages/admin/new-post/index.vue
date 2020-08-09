<template>
  <div class="admin-new-post">
    <section class="new-post-form">
      <admin-post-form @submit="onSubmitted"></admin-post-form>
    </section>
  </div>
</template>
<script>
import AdminPostForm from "@/components/admin/AdminPostForm";
import axios from "axios";
export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  methods: {
    onSubmitted(postData) {
      axios
        .post("https://nuxt-blog-fcd31.firebaseio.com/posts.json", postData)
        .then(result => console.log(result))
        .catch(e => console.log(e));
    }
  }
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