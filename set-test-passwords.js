import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables!')
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing')
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Set' : 'Missing')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const testAccounts = [
  { email: 'admin@example.com', password: 'Admin123' },
  { email: 'owner@example.com', password: 'Owner123' },
  { email: 'agent@example.com', password: 'Agent123' },
  { email: 'tenant@example.com', password: 'Tenant123' },
  { email: 'hassanahmed533@gmail.com', password: 'Admin123' }
]

async function setPasswords() {
  console.log('Setting passwords for test accounts...\n')
  
  for (const account of testAccounts) {
    try {
      // Update user password using admin API
      const { data, error } = await supabase.auth.admin.updateUserById(
        // First get the user ID
        (await supabase.auth.admin.listUsers()).data.users.find(u => u.email === account.email)?.id || '',
        { password: account.password }
      )
      
      if (error) {
        console.error(`❌ Failed to set password for ${account.email}:`, error.message)
      } else {
        console.log(`✅ Password set for ${account.email}`)
      }
    } catch (err) {
      console.error(`❌ Error setting password for ${account.email}:`, err.message)
    }
  }
  
  console.log('\n✅ All passwords have been set!')
  console.log('\nTest credentials:')
  testAccounts.forEach(acc => {
    console.log(`  ${acc.email} / ${acc.password}`)
  })
}

setPasswords()
