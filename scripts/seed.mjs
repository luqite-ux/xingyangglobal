import { createHash, randomUUID } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import ts from 'typescript'

const root = path.resolve(import.meta.dirname, '..')
const adminRoot = String.raw`D:\Cursor\Grand\huanqiu-admin`
const sourceRoot = String.raw`E:\E暂存\1599-荥阳面粉机械对接群\产品优化`
for (const envFile of [path.join(adminRoot, '.env'), path.join(adminRoot, '.env.local'), path.join(adminRoot, '_migrate-batch', '.env')]) {
  if (!existsSync(envFile)) continue
  for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const match = line.trim().match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (!match) continue
    let value = match[2].trim()
    if (/^['"]/.test(value)) value = value.slice(1, -1)
    process.env[match[1]] ??= value
  }
}
const need = (key) => { const value = process.env[key]?.trim(); if (!value) throw new Error(`Missing ${key}`); return value }
const db = createClient(need('NEXT_PUBLIC_SUPABASE_URL'), need('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false } })
const s3 = new S3Client({ region: 'auto', endpoint: need('R2_S3_ENDPOINT'), requestChecksumCalculation: 'WHEN_REQUIRED', responseChecksumValidation: 'WHEN_REQUIRED', credentials: { accessKeyId: need('R2_ACCESS_KEY_ID'), secretAccessKey: need('R2_SECRET_ACCESS_KEY') } })
const bucket = process.env.R2_BUCKET_NAME || 'sscewebsite'
const publicBase = (process.env.R2_PUBLIC_URL || need('R2_PUBLIC_URL_PREFIX')).replace(/\/$/, '')

function readCatalogue() {
  const filename = path.join(root, 'lib', 'products.ts')
  const source = readFileSync(filename, 'utf8').replace(/^import .*?\r?\n/, "const l=(en)=>({en}); const localize=(value)=>value.en;\n")
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
  const module = { exports: {} }
  new Function('exports', 'module', 'require', output)(module.exports, module, createRequire(import.meta.url))
  return module.exports
}

function imageFiles(directory) {
  const result = []
  for (const entry of readdirSync(directory)) {
    const full = path.join(directory, entry)
    if (statSync(full).isDirectory()) result.push(...imageFiles(full))
    else if (/\.(jpe?g|png|webp)$/i.test(entry)) result.push(full)
  }
  return result.sort((a, b) => a.localeCompare(b, 'zh-CN', { numeric: true }))
}

async function upload(file, keyPrefix) {
  const bytes = readFileSync(file)
  const sha = createHash('sha256').update(bytes).digest('hex')
  const ext = path.extname(file).toLowerCase()
  const key = `tenants/xingyangglobal/${keyPrefix}/${sha.slice(0, 20)}${ext}`
  await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: bytes, ContentType: ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg', CacheControl: 'public, max-age=31536000, immutable' }))
  return `${publicBase}/${key}`
}

const { products, categories } = readCatalogue()
const folders = {
  'multi-function-pulverizer-360-1000': '粉碎机',
  'stainless-steel-pulverizer-360-1000': '不锈钢粉碎机',
  'wood-crusher-420': '木材粉碎机',
  'stainless-steel-mixer-15-200': '不锈钢搅拌机',
  'fiber-filling-machine': '充棉机',
}
const categoryMap = new Map(categories.map((category) => [category.slug, category]))
const taskId = 'd06263e8-c46b-4bac-b647-2caa62faca93'
const tenantPayload = {
  id: randomUUID(), name: 'xingyangglobal', display_name: '荥阳市面粉机械制造厂', domain: 'xingyangglobal.com', email: 'info@xingyangglobal.com',
  password_hash: await bcrypt.hash('info12345', 12), admin_group: null, brand_color: '#d9661f', default_language: 'en', supported_languages: ['en'],
  contact_email: 'info@xingyangglobal.com', public_contact_email: 'info@xingyangglobal.com', inquiry_notification_email: 'info@xingyangglobal.com', contact_phone: '+86 135 2358 4804', contact_whatsapp: '', contact_address_short: 'Gaocun, Xingyang, Henan, China', contact_address_i18n: { en: 'Gaocun, Xingyang, Henan, China', zh: '河南省荥阳市高村' },
  site_title_i18n: { en: 'Xingyang City Flour Machinery Manufacturing Factory' }, site_tagline_i18n: { en: 'Grinding, Crushing, Mixing and Filling Equipment' }, site_description_i18n: { en: 'Pulverizers, wood crushers, stainless steel mixers and fiber filling machines from Gaocun, Xingyang, Henan, China.' },
  seo_title_i18n: { en: 'Pulverizers, Wood Crushers and Mixers | Xingyang Flour Machinery' }, seo_description_i18n: { en: 'Explore pulverizers, wood crushers, stainless steel mixers and fiber filling machines manufactured in Xingyang, Henan, China.' }, seo_keywords_i18n: { en: ['pulverizer', 'wood crusher', 'stainless steel mixer', 'fiber filling machine', 'flour machinery'] }, social_links: {}, google_analytics_id: '', google_tag_manager_id: '',
  notes: 'Customer source: supplied workbook and product folders. English legal display name is a recorded direct translation.',
  extra_settings: { company_delivery_task_id: taskId, legal_name_zh: '荥阳市面粉机械制造厂', legal_name_en_status: 'derived_direct_translation', legal_name_en: 'Xingyang City Flour Machinery Manufacturing Factory', site_settings_source: 'customer workbook and supplied files', site_settings_initialized_at: new Date().toISOString(), site_settings_manual_fields: [], translation_profile: { industry: 'Flour and material processing machinery', company_summary: 'Manufacturer in Gaocun, Xingyang, Henan, founded in 2002.', main_products: products.map((product) => product.name.en), target_markets: ['Overseas B2B machinery buyers'], glossary: { '粉碎机': 'pulverizer', '木材粉碎机': 'wood crusher', '不锈钢搅拌机': 'stainless steel mixer', '充棉机': 'fiber filling machine' } } },
}
const { data: existing } = await db.from('tenants').select('id').eq('domain', tenantPayload.domain).maybeSingle()
if (existing) tenantPayload.id = existing.id
const brandLogo = await upload(path.join(root, 'public', 'icon.svg'), 'brand')
tenantPayload.logo_url = brandLogo
tenantPayload.favicon_url = brandLogo
const { data: tenant, error: tenantError } = await db.from('tenants').upsert(tenantPayload, { onConflict: 'domain' }).select('id,domain,display_name,admin_group').single()
if (tenantError) throw tenantError
const { data: conflict } = await db.from('admin_users').select('id,tenant_id').eq('email', 'info@xingyangglobal.com').maybeSingle()
if (conflict && conflict.tenant_id !== tenant.id) throw new Error('Admin email belongs to another tenant')
const admin = { tenant_id: tenant.id, email: 'info@xingyangglobal.com', password_hash: await bcrypt.hash('info12345', 12), name: '荥阳市面粉机械制造厂', role: 'admin', is_active: true, must_change_password: false, admin_group: 2 }
if (conflict) { const { error } = await db.from('admin_users').update(admin).eq('id', conflict.id); if (error) throw error }
else { const { error } = await db.from('admin_users').insert(admin); if (error) throw error }

for (const [index, category] of categories.entries()) {
  const { error } = await db.from('product_categories').upsert({ tenant_id: tenant.id, slug: category.slug, name: category.name.en, name_en: category.name.en, name_i18n: { en: category.name.en }, description: category.description.en, description_en: category.description.en, description_i18n: { en: category.description.en }, sort_order: index, is_active: true, extra_data: { tagline: category.tagline.en, highlights: category.highlights.en } }, { onConflict: 'tenant_id,slug' })
  if (error) throw error
}
let uploadCount = 1
for (const [index, product] of products.entries()) {
  const files = imageFiles(path.join(sourceRoot, folders[product.slug]))
  const urls = []
  for (const [imageIndex, file] of files.entries()) urls.push(await upload(file, `products/${product.slug}/${String(imageIndex + 1).padStart(2, '0')}`))
  uploadCount += urls.length
  const category = categoryMap.get(product.categorySlug)
  const payload = { tenant_id: tenant.id, slug: product.slug, name: product.name.en, name_en: product.name.en, name_i18n: { en: product.name.en }, description: product.summary.en, description_en: product.summary.en, description_i18n: { en: product.summary.en }, overview: product.overview.en.join('\n\n'), overview_en: product.overview.en.join('\n\n'), overview_i18n: { en: product.overview.en.join('\n\n') }, image_url: urls[0], category: category?.name.en ?? product.categorySlug, category_slug: product.categorySlug, features: product.selectionNotes.en, features_i18n: { en: product.selectionNotes.en }, applications: category?.applications ?? [], applications_i18n: { en: category?.applications ?? [] }, advantages: [], advantages_i18n: { en: [] }, specs: { groups: product.specs }, sort_order: index, is_active: true, extra_data: { images: urls, specs_pending: product.specsPending, source_folder: folders[product.slug] } }
  const { error } = await db.from('products').upsert(payload, { onConflict: 'tenant_id,slug' })
  if (error) throw error
}
const { error: seoError } = await db.from('seo_tenant_config').upsert({ tenant_id: tenant.id, enabled: false }, { onConflict: 'tenant_id' })
if (seoError) throw seoError
const [{ count: productCount }, { count: categoryCount }, { data: tenantCheck }, { data: adminCheck }] = await Promise.all([
  db.from('products').select('*', { count: 'exact', head: true }).eq('tenant_id', tenant.id), db.from('product_categories').select('*', { count: 'exact', head: true }).eq('tenant_id', tenant.id), db.from('tenants').select('id,domain,display_name,admin_group,logo_url,favicon_url,extra_settings').eq('id', tenant.id).single(), db.from('admin_users').select('email,tenant_id,admin_group,must_change_password').eq('email', 'info@xingyangglobal.com').single(),
])
if (productCount !== 5 || categoryCount !== 5 || tenantCheck.admin_group !== null || adminCheck.must_change_password !== false) throw new Error('Seed readback contract failed')
console.log(JSON.stringify({ result: 'PASS', tenantId: tenant.id, productCount, categoryCount, uploadCount, tenantAdminGroup: tenantCheck.admin_group, adminUserGroup: adminCheck.admin_group, mustChangePassword: adminCheck.must_change_password, seoEnabled: false }))
