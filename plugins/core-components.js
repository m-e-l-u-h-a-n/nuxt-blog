// This registering components in this file and then registering this file in the nuxt.config.js file makes the components globally accessible without registering in any pages and components.

import Vue from 'vue'
import AppButton from '@/components/ui/AppButton';
import AppControlInput from '@/components/ui/AppControlInput';
import PostList from '@/components/posts/PostList';

Vue.component('AppButton', AppButton)
Vue.component('ApppControlInput', AppControlInput)
Vue.component('PostList', PostList)