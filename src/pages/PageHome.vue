<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            v-model="newTwootContent"
            class="new-twoot"
            placeholder="What's happening?"
            maxlength="280"
            bottom-slots
            counter
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewtwoot"
            :disable="!newTwootContent"
            class="q-mb-lg"
            color="primary"
            label="twoot"
            rounded
            unelevated
            no-caps
          />
        </div>
      </div>

      <q-separator class="divider" color="grey-2" size="10px" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item v-for="twoot in twoots" :key="twoot.id" class="twoot q-py-md">
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>User</strong>
                <span class="text-grey-7">
                  @user_123
                  <br class="lt-md" />&bull; {{ twoot.date | relativeDate }}
                </span>
              </q-item-label>
              <q-item-label class="twoot-content text-body1">{{
                twoot.content
              }}</q-item-label>
              <div class="twoot-icons row justify-between q-mt-sm">
                <q-btn
                  color="grey"
                  icon="far fa-comment"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  color="grey"
                  icon="fas fa-retweet"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  @click="toggleLiked(twoot)"
                  :color="twoot.liked ? 'pink' : 'grey'"
                  :icon="twoot.liked ? 'fas fa-heart' : 'far fa-heart'"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  @click="deleteTwoot(twoot)"
                  color="grey"
                  icon="fas fa-dumpster"
                  size="sm"
                  flat
                  round
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
import { formatDistance } from "date-fns";

export default {
  name: "PageHome",
  data() {
    return {
      newTwootContent: "",
      twoots: [
        //{
        //  Content:
        //    "A clever person solves a problem. A wise person avoids it. -Albert Einstein",
        //  date: 1669903966640,
        //},
        //{
        //  Content:
        //    "Tell me and I forget. Teach me and I remember. Involve me and I learn. -Benjamin Franklin",
        //  date: 1669904151094,
        //},
      ],
    };
  },

  methods: {
    addNewtwoot() {
      let newTwoot = {
        content: this.newTwootContent,
        date: Date.now(),
        liked: false,
      };
      // this.twoots.unshift(newtwoot)
      db.collection("twoots")
        .add(newTwoot)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      this.newTwootContent = "";
    },
    deleteTwoot(twoot) {
      db.collection("twoots")
        .doc(twoot.id)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },
    toggleLiked(twoot) {
      db.collection("twoots")
        .doc(twoot.id)
        .update({
          liked: !twoot.liked,
        })
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
  },

  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    },
  },
  mounted() {
    db.collection("twooot")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let twootChange = change.doc.data();
          if (change.type === "added") {
            console.log("new twoot: ", twootChange);
            this.twoots.unshift(twootChange);
          }
          if (change.type === "modified") {
            console.log("modified twoot: ", twootChange);
          }
          if (changetype === "removed") {
            console.log("removed twoot: ", twootChange);
          }
        });
      });
  },
};
</script>

<style lang="sass">
.new-twoot
  textarea
    font: size 19px
      line-height: 1.4 !important
.twoot-Content
  white-space: pre-line

.divier
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.twoot:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)

.twoot-İcons
  margin-left: -5px
</style>
