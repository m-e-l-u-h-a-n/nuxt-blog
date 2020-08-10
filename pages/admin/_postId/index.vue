<template>
  <div class="admin-post-page">
    <section class="update-form">
      <admin-post-form @submit="onSubmitted" :post="this.loadedPost"></admin-post-form>
    </section>
  </div>
</template>
<script>
// import AdminPostForm from "@/components/admin/AdminPostForm";
import axios from "axios";
export default {
  layout: "admin",
//   components: {
//     AdminPostForm
//   },
  asyncData(context) {
    return axios
      .get(
        "https://nuxt-blog-fcd31.firebaseio.com/posts/" +
          context.params.id +
          ".json"
      )
      .then(result => {
        return { loadedPost: { ...result.data, id: context.params.postId } };
      })
      .catch(err => {
        return context.error(err);
      });
  },
  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch("editPost", editedPost).then(() => {
        this.$router.push("/admin");
      });
    }
  }
};
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