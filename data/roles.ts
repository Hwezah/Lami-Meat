// Careers. PLACEHOLDER listings pending client review.
export type Role = { id: string; num: string; title: string; meta: string; summary: string; lookFor: string[] };

export const roles: Role[] = [
  { id: "j0", num: "01", title: "Butchery Assistant", meta: "Kampala · Full-time", summary: "Trim, mince, weigh and pack beef in our clean room, working to our hygiene and portioning standards every day.", lookFor: ["Experience in a butchery or food production is a plus", "Careful with hygiene and detail", "Comfortable in a cold room and on your feet"] },
  { id: "j1", num: "02", title: "Smokehouse Operator", meta: "Kampala · Full-time", summary: "Run the smoking batches — loading racks, managing the fire, checking colour and temperature, and logging every batch.", lookFor: ["Experience with smoking or cooking at volume", "Reliable with timings and records", "Happy with early starts"] },
  { id: "j2", num: "03", title: "Delivery Rider", meta: "Kampala · Full-time", summary: "Bring orders across Kampala in cold boxes — on time, well handled, and with a friendly word at the door.", lookFor: ["Valid riding permit", "Knows Kampala well", "Good with customers"] },
  { id: "j3", num: "04", title: "Sales & Customer Care", meta: "Kampala · Full-time", summary: "Answer WhatsApp and calls, confirm orders, schedule deliveries and look after our wholesale clients.", lookFor: ["Clear, friendly written English (Luganda a plus)", "Organised and quick to reply", "Comfortable with Mobile Money and spreadsheets"] },
];

export const perks = [
  { num: "01", title: "Hands-on training", desc: "We teach our methods from your first day, station by station." },
  { num: "02", title: "A clean, cold room", desc: "Proper gear, proper hygiene and safe, maintained equipment." },
  { num: "03", title: "Regular hours", desc: "Monday to Saturday, with rotas planned in advance." },
  { num: "04", title: "Room to grow", desc: "Learn every station — from mincing to the smokehouse." },
];
