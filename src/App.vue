<template>
  <div id="app">
    <Menus refresh debug />
    <Dropzone
      @read="copyAction"
      auto-read
      @drop="testDrop"
      single
      :accepts="['.aia']"
    />
    <Panel no-utils script-path="./host/[appName]/">
      <Wrapper>
        <div v-if="canReset">
          <div
            style="display: flex; justify-content: center; align-items: flex-end; color: var(--color-selection)"
          >
            <Icon name="cat" />
            <Anno>Data copied</Anno>
          </div>
          <Grid>
            <Button label="reset" pill outline secondary @click="reset" />
            <Button label="copy" pill outline @click="copyResult" />
          </Grid>
          <TextArea
            :rows="this.text.split('\r\n').length + 1"
            :resizeable="false"
            read-only
            :label="fileName"
            v-model="text"
          />
        </div>
        <div style="text-align: center" v-else>
          <Cat-Image />
          <Anno>Drop any .aia file here</Anno>
        </div>
      </Wrapper>
    </Panel>
  </div>
</template>

<script>
import { evalScript, copy } from "brutalism";
export default {
  data: () => ({
    text: "",
    fileName: "",
    result: "",
  }),
  computed: {
    canReset() {
      return this.text && this.text.length;
    },
  },
  components: {
    "Cat-Image": require("./components/Cat-Image.vue").default,
  },
  methods: {
    reset() {
      this.text = "";
      this.fileName = "";
      this.result = "";
    },
    copyResult() {
      copy(this.result);
    },
    testDrop(evt) {
      console.log(evt);
    },
    copyAction(evt) {
      this.text = evt;
      let temp = this.text.split("\r\n"),
        copyString = "";
      temp.forEach((line, i) => {
        copyString += `"${line}"${i < temp.length - 1 ? " +\r\n" : ""}`;
      });
      copy(copyString);
    },
  },
};
</script>

<style></style>
