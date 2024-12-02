import express from "express";
// import mongoose from mongoose;
import db from "../db/conn.mjs";
// import { ObjectId } from "mongodb";

const router = express.Router();


// http://localhost:5050/grades_agg/learner/2/avg-class
// router.get("/learner/:id/avg-class", async (req, res) => {
//   let collection = await db.collection("grades");

//   let result = await collection
//     .aggregate([
//       {
//         $match: { learner_id: Number(req.params.id) },
//       },
//       {
//         $unwind: { path: "$scores" },
//       },
//       {
//         $group: {
//           _id: "$class_id",
//           quiz: {
//             $push: {
//               $cond: {
//                 if: { $eq: ["$scores.type", "quiz"] },
//                 then: "$scores.score",
//                 else: "$$REMOVE",
//               },
//             },
//           },
//           exam: {
//             $push: {
//               $cond: {
//                 if: { $eq: ["$scores.type", "exam"] },
//                 then: "$scores.score",
//                 else: "$$REMOVE",
//               },
//             },
//           },
//           homework: {
//             $push: {
//               $cond: {
//                 if: { $eq: ["$scores.type", "homework"] },
//                 then: "$scores.score",
//                 else: "$$REMOVE",
//               },
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           class_id: "$_id",
//           avg: {
//             $sum: [
//               { $multiply: [{ $avg: "$exam" }, 0.5] },
//               { $multiply: [{ $avg: "$quiz" }, 0.3] },
//               { $multiply: [{ $avg: "$homework" }, 0.2] },
//             ],
//           },
//         },
//       },
//     ])
//     .toArray();

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });




// // http://localhost:5050/grades_agg/stats
// router
//   .route("/stats")
//   .get(async (req, res) => {
//     let collection = await db.collection("grades");

//     let result = await collection
//       .aggregate([
//         {
//           $unwind: { path: "$scores" }
//         },
//         {
//           $group: {
//             _id: "$learner_id",
//             quiz: {
//               $push:
//               {
//                 $cond: {
//                   if: { $eq: ["$scores.type", "quiz"] },
//                   then: "$scores.score",
//                   else: "$$REMOVE",
//                 },
//               },
//             },
//             exam: {
//               $push: {
//                 $cond: {
//                   if: { $eq: ["$scores.type", "exam"] },
//                   then: "$scores.score",
//                   else: "$$REMOVE",
//                 },
//               },
//             },
//             homework: {
//               $push: {
//                 $cond: {
//                   if: { $eq: ["$scores.type", "homework"] },
//                   then: "$scores.score",
//                   else: "$$REMOVE",
//                 },
//               },
//             },
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             classs_id: "$_id",
//             avg: {
//               $sum: [
//                 { $multiply: [{ $avg: "$exam" }, 0.5] },
//                 { $multiply: [{ $avg: "$quiz" }, 0.3] },
//                 { $multiply: [{ $avg: "$homework" }, 0.2] },
//               ],
//             },
//           },
//         },
//         {
//           $match: {
//             avg: { $gte: 70 },
//           },
//         },
//       ])
//       .toArray();
//     console.log(result)

//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
//   });




// // http://localhost:5050/grades_agg/stats/339
// router
//   .route("/stats/:id")
//   .get(async (req, res) => {
//     let collection = await db.collection("grades");

//     await collection.createIndex({ learner_id: 1, class_id: 1 });

//     let result = await collection
//       .aggregate([
//         {
//           $match: { class_id: Number(req.params.id) },
//         },
//         {
//           $unwind: { path: "$scores" },
//         },
//         {
//           $group: {
//             _id: "$learner_id",
//             quiz: {
//               $push: {
//                 $cond: {
//                   if: { $eq: ["$scores.type", "quiz"] },
//                   then: "$scores.score",
//                   else: "$$REMOVE",
//                 },
//               },
//             },
//             exam: {
//               $push: {
//                 $cond: {
//                   if: { $eq: ["$scores.type", "exam"] },
//                   then: "$scores.score",
//                   else: "$$REMOVE",
//                 },
//               },
//             },
//             homework: {
//               $push: {
//                 $cond: {
//                   if: { $eq: ["$scores.type", "homework"] },
//                   then: "$scores.score",
//                   else: "$$REMOVE",
//                 },
//               },
//             },
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             learner_id: "$_id",
//             avg: {
//               $sum: [
//                 { $multiply: [{ $avg: "$exam" }, 0.5] },
//                 { $multiply: [{ $avg: "$quiz" }, 0.3] },
//                 { $multiply: [{ $avg: "$homework" }, 0.2] },
//               ],
//             },
//           },
//         },
//         {
//           $match: {
//             avg: { $gte: 70 },
//           },
//         },
//         {
//           $facet: {
//             total: [
//               { $count: "total" }
//             ],
//             above70: [
//               { $match: { avg: { $gt: 70 } } },
//               { $count: "above70" }
//             ]
//           }
//         },
//         {
//           $project: {
//             total: { $arrayElemAt: ["$total.total", 0] },
//             above70: { $arrayElemAt: ["$above70.above70", 0] }
//           }
//         },
//         {
//           $project: {
//             total: 1,
//             above70: 1,
//             percAbove70: {
//               $cond: {
//                 if: { $eq: ["$total", 0] },
//                 then: 0,
//                 else: { $multiply: [{ $divide: ["$above70", "$total"] }, 100] }
//               }
//             }
//           }
//         }
//       ])

//       .toArray();

//     if (!result) {
//       return res.status(404).send("Not found");
//     } else {
//       return res.status(200).send(result);
//     }
//   });


// async () => {
//   await db.createCollection("grades", {
//     validator: {
//       $jsonSchema: {
//         bsonType: "object",
//         title: "Grades Validation",
//         required: ["class_id", "learner_id"],
//         properties: {
//           class_id: {
//             bsonType: "int",
//             minimum: 0,
//             maximum: 300,
//             description: "integer must be between 0 and 300"
//           },
//           learner_id: {
//             bsonType: "int",
//             minimum: 0,
//             description: "integer must be greater than or equal to 0"
//           },
//         },
//       },
//     },
//     validationAction: "warn"
//   });
// };

export default router;