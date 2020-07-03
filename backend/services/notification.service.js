"use strict";

const firebase = require("firebase-admin");
const serviceAccount = require("../secret/serviceAccount-firebase-adminsdk.json");
const firebaseConfig = require("../secret/firebaseConfig");
const { databaseURL } = firebaseConfig;
const sendmail = require("sendmail")();

let messaging;
const registrationTokens = [
	"edPnfT_zPUtkn7uHzUKACR:APA91bG-HpDZV__5LvCIphNN9xMBg0juvVva9R2o8WBOCT67-VYUUpMnnX9lefvtYqnzNvZPiLaRx3IfOBEDVfccGzr78CNGu0s7JBscM09s6Dxtrp_HCMPL1nHfvHJLL0NGwwfLPBHJ",
	"cU49AhqFjdioFmzcg1IEQL:APA91bGavxb873d2ey2nVIWxZMzFoEBP_93HiE9OILEJ4IBl7KdxP4ejfr68V8eWzqKLa75iVxOydNELPJfPFFA1X2GmCptZGzc-YzJA4MtdBbaa-9bZ5_jdYMx7_Z-rKOOWYAmxmUj4",
];

const users = {
	alpha: registrationTokens[0],
	beta: registrationTokens[1],
};

module.exports = {
	name: "notification",
	settings: {},

	actions: {
		registerToken: {
			handler({ params: { registrationToken, username } }) {
				users[username] = registrationToken;
				registrationTokens.push(registrationToken);
				return users;
			},
		},

		/** Send a message to a device specified by the token
		 *
		 */
		sendMessageToSpecificDevice: {
			handler({ params: { sender, receiver, content = "" } }) {
				const token = users[receiver];

				const message = {
					data: {
						sender,
						content,
					},
					token,
				};
				// return message
				return messaging.send(message);
			},
		},

		/** Send message to a list of clients by specifying their tokens
		 *
		 */
		sendMessagesToMultipleDevices: {
			handler() {
				const tokens = registrationTokens;
				const message = {
					data: {
						score: "850",
						time: "2:45",
						message: "This is a broadcast",
					},
					tokens,
				};
				return messaging.sendMulticast(message);
			},
		},

		sendMessageToSingleTopic: {
			handler({ params: { topic } }) {
				// The topic name can be optionally prefixed with "/topics/".
				const message = {
					data: {
						title: topic.toUpperCase(),
						content: "This message was sent to a specific topic: " + topic,
					},
					topic,
				};

				return messaging.send(message);
			},
		},

		/** Send message to an array of topics
		 *  @param {Array} topics - An array of strings
		 *
		 * Define a condition which will send to devices which are subscribed
		 * to either the Google stock or the tech industry topics.
		 * Example: var condition = "'stock-GOOG' in topics || 'industry-tech' in topics";
		 */
		sendMessageToMultipleTopics: {
			handler({ params: { topics } }) {
				let condition = `'${topics.splice(0, 1)}' in topics`;

				topics.forEach((topic) => (condition += ` && '${topic}' in topics`));

				const message = {
					notification: {
						title: condition.toUpperCase(),
						body: "Message sent to the following topics: " + topics.toString(),
					},
					condition,
				};

				return messaging.send(message);
			},
		},

		sendABatchOfMessages: {
			handler() {
				const messages = [
					{
						notification: {
							title: "Price drop",
							body: "5% off all electronics",
						},
						token: registrationTokens,
					},

					{
						notification: {
							title: "Price drop",
							body: "2% off all books",
						},
						topic: "readers-club",
					},
				];

				return messaging.sendAll(messages);
			},
		},

		/** Subscribe the devices corresponding to the registration tokens to the topic. */
		subscribeToTopic: {
			handler({ params: { registrationToken, topic } }) {
				return messaging.subscribeToTopic(registrationToken, topic);
			},
		},

		// Unsubscribe the devices corresponding to the registration tokens from
		// the topic.
		unsubscribeFromTopic: {
			handler({ params: { registrationToken, topic } }) {
				return messaging.unsubscribeFromTopic(registrationToken, topic);
			},
		},

		/** Send an email
		 *
		 * @param {Object} params
		 * @param {String} [parans.to] - "bar@example.com, baz@example.com"
		 * @param {String} [params.subject]
		 * @param {String} [params.text]
		 * @param {String} [params.html] "text/plain | html"
		 *
		 */
		sendEmail: {
			// https://www.npmjs.com/package/sendmail

			handler(ctx) {

				const payload = {
					...ctx.params,
					subject: ctx.params.subject || "Test email",
					from: "fabrigeas@hotmail.com",
				};

				sendmail(payload, function (error, reply) {

					if (error) {
						return {
							success: false,
							error,
						};
					}

					return {
						success: true,
						reply,
					};
				});

				return payload;

			},
		},
	},

	methods: {},

	created() {
		firebase.initializeApp({
			credential: firebase.credential.cert(serviceAccount),
			databaseURL,
		});

		messaging = firebase.messaging();
	},
	
};
