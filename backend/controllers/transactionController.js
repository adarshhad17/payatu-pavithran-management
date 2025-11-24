import Transaction from "../models/Transaction.js";

// =============================
// GET ALL
// =============================
export const getAll = async (req, res) => {
  try {
    const q = req.query.q || "";
    const filter = q ? { name: { $regex: q, $options: "i" } } : {};
    const data = await Transaction.find(filter).sort({ indexNumber: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =============================
// PARENT — UPDATE ONLY NOTE
// =============================
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const t = await Transaction.findById(id);
    if (!t) return res.status(404).json({ message: "Not found" });

    // Note logic
    if (note === "" || note == null) {
      t.note = null;
      t.result = null;
    } else {
      t.note = Number(note);
      t.result =
        t.theyGive == null
          ? null
          : Number(t.note) - Number(t.diff);
    }

    // 🔥 SAVE DATE + TIME
   const d = new Date();
const date = d.toLocaleDateString("en-GB");
const time = d.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});
t.date = `${date} ${time}`;


    await t.save();
    res.json(t);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// =============================
// ADMIN — ADD NEW RECORD
// =============================
export const adminAdd = async (req, res) => {
  try {
    const t = new Transaction(req.body);

    t.iGive = t.iGive == null || t.iGive === "" ? null : Number(t.iGive);
    t.theyGive = t.theyGive == null || t.theyGive === "" ? null : Number(t.theyGive);

    t.diff =
      t.iGive == null || t.theyGive == null
        ? null
        : t.theyGive - t.iGive;

    t.note = t.note == null || t.note === "" ? null : Number(t.note);

    t.result =
      t.note == null || t.theyGive == null
        ? null
        : t.note - t.theyGive;

    // ❌ REMOVE THIS
    // t.date = t.date || new Date().toLocaleDateString("en-GB");

    // ✔ CORRECT (NO DATE BEFORE UPDATE)
    t.date = null;

    await t.save();
    res.json(t);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// =============================
// ADMIN — FULL UPDATE
// =============================
export const adminUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const t = await Transaction.findById(id);
    if (!t) return res.status(404).json({ message: "Not found" });

    const { name, iGive, theyGive, note, date } = req.body;

    if (name !== undefined) t.name = name;

    t.iGive = iGive === "" || iGive == null ? null : Number(iGive);
    t.theyGive = theyGive === "" || theyGive == null ? null : Number(theyGive);

    t.diff =
      t.iGive == null || t.theyGive == null
        ? null
        : t.theyGive - t.iGive;

    t.note = note === "" || note == null ? null : Number(note);

    t.result =
      t.note == null || t.theyGive == null
        ? null
        : t.theyGive - t.note;

    if (date !== undefined) t.date = date;

    await t.save();
    res.json(t);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =============================
// DELETE
// =============================
export const adminDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const t = await Transaction.findByIdAndDelete(id);
    if (!t) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
