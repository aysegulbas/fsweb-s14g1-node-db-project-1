const db = require("../../data/db-config");
const getAll = async (limit, sortby, sortdir) => {
  limit = limit || db("accounts").length;
  sortby = sortby || "id";
  sortdir = sortdir || "asc";
  return db("accounts").orderBy(sortby, sortdir).limit(limit);
  // /api/accounts?limit=5&sortBy=id&sortDir=desc uzantısını aktif etmek için getAll fonksiyonunu bu hale getirdik
};

const getById = (id) => {
  return db("accounts").where("id", id).first();
  //object dönsün diye first() yazdık, diğer türlü array döner
};
const getByName = (name) => {
  return db("accounts").where("name", name).first();
  //object dönsün diye first() yazdık, diğer türlü array döner
};

const create = async (account) => {
  //create edilen şey geri dönmeli
  const [id] = await db("accounts").insert(account);
  //insert array döner
  // var a=[1,2,3,4] var[b]=a dersek 1 yani ilk eleman döner
  return getById(id);
};

const updateById = async (id, account) => {
  await db("accounts").where("id", id).update(account);
  //await demezsek updat edilmeyen id'i görebiliriz
  return getById(id);
};

const deleteById = (id) => {
  return db("accounts").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
};
