<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      right
      fixed
      app
    >
      <v-list dense>
        <v-list-item link @click.stop="openDuplicateModal">
          <v-list-item-action>
            <v-icon>mdi-content-copy</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Duplicate Selected</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click.stop="openContentModal">
          <v-list-item-action>
            <v-icon>mdi-content-duplicate</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dynamic Content</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <ContenForm :dialog="contentModal" @contentClose="contentClose"/>
    <DuplicateForm :dialog="duplicateModal" @duplicateClose="duplicateClose"/>
    <span @click.stop="openNavigation" class="toggle-main-nav">
      <v-icon>mdi-arrow-left-bold-box</v-icon>
    </span>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex';
  import DuplicateForm from './components/duplicate-form';
  import ContenForm from './components/content-form';

  export default {
    props: {
      source: String,
    },
    components: {
      DuplicateForm,
      ContenForm
    },
    data: () => ({
      drawer: false,
      duplicateModal: false,
      contentModal: false
    }),
    methods: {
      openNavigation: function(){
        this.duplicateModal = false;
        this.contentModal = false;
        this.drawer = true;
        this.getPageType();
      },
      openDuplicateModal: function(){
        this.duplicateModal = true;
        this.drawer = false;
      },
      openContentModal: function(){
        this.contentModal = true;
        this.drawer = false;
      },
      duplicateClose: function(){
        this.duplicateModal = false;
      },
      contentClose: function(){
        this.contentModal = false;
      },
      ...mapActions(['setToken', 'getPageType'])
    },
    created: function() {
      this.setToken();
    }
  }
</script>