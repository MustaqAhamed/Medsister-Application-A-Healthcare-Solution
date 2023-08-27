

global.navigator = { userAgent: "all" };

const path = require("path");
const http = require("http");
const Express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const { Wit } = require("node-wit");
const SocketIO = require("socket.io");


// initialize the server and configure support for ejs templates
const app = new Express();
const server = http.Server(app);
let io = new SocketIO(server);

let authenticated = false;

const client = new Wit({
  accessToken: "DQSIUKAO33H6TOHBBRMCRXZFWBSJDIMJ",
});

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    //Invoke Wit.AI NLP Engine
    client
      .message(data.text, {})
      .then((data) => {
        //Find doctors and notify client
        if (data.entities.hasOwnProperty("intent")) {
          switch (data.entities.intent[0].value) {
            //Trained
            case "find_providers":
              socket.emit("message", {
                id: 1,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: `You have 5 Doctors near you, the closest one is 3.2 miles from you, I've marked their location in your links!`,
                type: "message",
                link: "http://maps.apple.com/?q=Doctor",
                subject: "Doctors",
                label: "green",
                timestamp: moment().format("h:mm a"),
              });
              break;
              case "find_hospitals":
                socket.emit("message", {
                  id: 2,
                  user: 0,
                  requireAuth: false,
                  auth: authenticated,
                  msg: `You have 5 hospitals near you, the closest ones are been marked in the link`,
                  type: "message",
                  link: "http://maps.google.com/?q=Hospital",
                  subject: "Hospitals",
                  label: "green",
                  timestamp: moment().format("h:mm a"),
                });
                break;
            //Trained
            case "medical_data":
              socket.emit("message", {
                id: 3,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: "Blood Pressure : 110/68 mm Hg; Sugar level : 100 mg/dL; Temperature : 98.6F;",
                type: "message",
                link: null,
                subject: "Healthy",
                label: "healthy",
                timestamp: moment().format("h:mm a"),
              });
              break;
            //Not trained
            case "blog_website":
              socket.emit("message", {
                id: 4,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: "Please click on the link to start blogging!",
                type: "message",
                link: "https://medsister-blog.web.app/",
                subject: "MedSister Blog",
                label: "red",
                timestamp: moment().format("h:mm a"),
              });
              break;
            //Trained
            case "insurance_purchase":
              socket.emit("message", {
                id: 5,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: "Awesome! I can recommend the BlueSelect or BlueOptions plans for you for only $226 and $310 per month respectively!",
                type: "message",
                link: "https://www.policybazaar.com/health-insurance/health-insurance-india/",
                subject: "Insurance",
                label: "primary2",
                timestamp: moment().format("h:mm a"),
              });
              break;

            // case "set_alarm":
            //   // Extract the 'datetime' entity recognized by Wit.ai (this is just an example, use your actual entity name)
            //   const datetimeEntity = witResponse.entities.datetime;

            //   if (datetimeEntity && datetimeEntity[0].value) {
            //     const alarmTime = moment(datetimeEntity[0].value).format(
            //       "MMMM Do [at] h:mm A"
            //     );
            //     const msg = `Alarm set on ${alarmTime}`;

            //     socket.emit("message", {
            //       id: 6,
            //       user: 0,
            //       requireAuth: false,
            //       auth: authenticated,
            //       msg: msg,
            //       type: "message",
            // //       link: null,
            // //       subject: null,
            // //       label: null,
            // //       timestamp: moment().format("h:mm a"),
            //     // });
            
            //       // In case Wit.ai didn't recognize the 'datetime' entity, you can emit an error or handle the situation accordingly.
            //       else {
            //     socket.emit("message", {
            //       id: 7,
            //       user: 0,
            //       requireAuth: false,
            //       auth: authenticated,
            //       msg: "Sorry, I couldn't understand the alarm time.",
            //       type: "message",
            //       link: null,
            //       subject: null,
            //       label: null,
            //       timestamp: moment().format("h:mm a"),
            //     });
            //   }
            //   break;

            // Trained
            // case "set_medication":
            //   socket.emit("message", {
            //     id: 8,
            //     user: 0,
            //     requireAuth: false,
            //     auth: authenticated,
            //     msg: "I am setting an alarm to take medication at 08:00 AM tomorrow",
            //     type: "message",
            //     link: null,
            //     subject: null,
            //     label: null,
            //     timestamp: moment().format("h:mm a"),
            //   });
            //       break;
              
            //Testingset_medication
            case "set_medication":
              socket.emit("message", {
                id: 9,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: "I am setting an alarm to take medication at 08:00 AM tomorrow",
                type: "message",
                link: null,
                subject: null,
                label: null,
                timestamp: moment().format("h:mm a"),
              });
                  break;
              
            //Not trained
            case "medication_refill":
              socket.emit("message", {
                id: 10,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: "Noted! We will arrange a refill for your prescription of Lisinopril.",
                type: "message",
                link: null,
                subject: null,
                label: null,
                timestamp: moment().format("h:mm a"),
              });
              break;
            // Trained
            case "greeting":
              socket.emit("message", {
                id: 11,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: "Hello! How can I help you today?",
                type: "message",
                link: null,
                subject: null,
                label: null,
                timestamp: moment().format("h:mm a"),
              });
              break;
            //Trained
            case "bye":
              socket.emit("message", {
                id: 12,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: "I am glad that I could help you, have a fantastic rest of your day!",
                type: "message",
                link: null,
                subject: null,
                label: null,
                timestamp: moment().format("h:mm a"),
              });
              break;
            //Trained
            case "help":
              socket.emit("message", {
                id: 13,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: "What can I help you with? I can help with things like Insurance Purchases and Nearby Doctors.",
                type: "message",
                link: null,
                subject: null,
                label: null,
                timestamp: moment().format("h:mm a"),
              });
              break;
            //Trained
            case "personal_inquiry":
              socket.emit("message", {
                id: 14,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: "Im doing quite well thanks for asking! How are you?",
                type: "message",
                link: null,
                subject: null,
                label: null,
                timestamp: moment().format("h:mm a"),
              });
              break;
            // Trained
            case "greet_medsister":
              socket.emit("message", {
                id: 15,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: "Hey, I am Medsister, How can I help you today?",
                type: "message",
                link: null,
                subject: null,
                label: null,
                timestamp: moment().format("h:mm a"),
              });
              break;
            //Trained
            case "emergency":
              socket.emit("message", {
                id: 16,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: "I am really sorry to hear that you are experiencing a medical emergency. Please call emergency services immediately at 911.",
                type: "message",
                link: null,
                subject: null,
                label: null,
                timestamp: moment().format("h:mm a"),
              });
              break;

            // Set alarm testing
            case "create_alarm":
              socket.emit("message", {
                id: 17,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: "I am really sorry to hear that you are experiencing a medical emergency. Please call emergency services immediately at 911.",
                type: "message",
                // id: "212570860309216",
                name: "wit$create_alarm",
                confidence: 0.9886,
                link: null,
                subject: null,
                label: null,
                timestamp: moment().format("h:mm a"),
              });
              break;
            case "auth":
              //TODO AUTHENTICATE USER
              console.log(data);
            //   let birthdate = data.entities.datetime[0];

              //TODO just comparing it to JSON for the prototype

              authenticated = true;

              socket.emit("message", {
                id: 18,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: "Thank you for authenticating! What can I help you with",
                type: "message",
                link: null,
                subject: null,
                label: null,
                timestamp: moment().format("h:mm a"),
              });
              break;

            default:
              socket.emit("message", {
                id: 19,
                user: 0,
                requireAuth: false,
                auth: authenticated,
                msg: "Yikes not really sure what to do",
                type: "message",
                link: null,
                subject: null,
                label: null,
                timestamp: moment().format("h:mm a"),
              });
          }
        } else {
          socket.emit("message", {
            user: 0,
            requireAuth: false,
            auth: authenticated,
            msg: 'Sorry im not sure what to do with your request. Try asking something like "Find my provider" or "Help me find a plan"',
            type: "message",
            link: null,
            subject: null,
            label: null,
            timestamp: moment().format("h:mm a"),
          });
        }
      })
      .catch(() => {
        socket.emit("message", {
          user: 2,
          requireAuth: false,
          auth: authenticated,
          msg: "Failed to Connect",
          type: "event",
          link: null,
          subject: null,
          label: null,
          timestamp: moment().format("h:mm a"),
        });
      });
  });
});

// universal routing and rendering
app.get("*", (req, res) => {});

// start the server
const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV || "production";

server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
