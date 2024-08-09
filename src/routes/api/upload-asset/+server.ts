import { json } from '@sveltejs/kit';
// import { storeAsset } from '$lib/api';

// export async function PUT({ request }) {
//   const data = await request.formData();
//   const asset_id = data.get('path');
//   const file = data.get('file')?.valueOf();
//   // console.log(
//   //   file?.name, // filename
//   //   file?.type, // mime type
//   //   file?.size, // file size in bytes
//   //   file?.lastModified, // last modified date
//   //   file?.arrayBuffer() // ArrayBuffer with the file contents
//   // );
//   await storeAsset(asset_id, file);
//   return json({ path: asset_id });
// }

export async function PUT({ request, platform }) {
  const db: D1Database = platform.env.DB;
    const data = await request.formData();
  const asset_id = data.get('path');
  const file = data.get('file')?.valueOf() as File;
  const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const sql = `
  INSERT into assets (asset_id, mime_type, updated_at, size, data) VALUES (?, ?, ?, ?, ?)
  ON CONFLICT (asset_id) DO
  UPDATE
     SET mime_type = excluded.mime_type,
         updated_at = excluded.updated_at,
         size = excluded.size,
         data = excluded.data
  WHERE asset_id = excluded.asset_id
  `;
	const stmnt = await db
    .prepare(sql)
    .bind(asset_id, file.type, new Date().toISOString(), file.size, buffer)
    .run();
  if (!stmnt.success) {
    return json({ error: 'Could not store asset' }, { status: 500 });
  }
  return json({ path: asset_id });
	// stmnt.run(asset_id, file.type, new Date().toISOString(), file.size, buffer);
}