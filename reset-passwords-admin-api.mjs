import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const SUPABASE_URL = 'https://ptjttzbtmyklfvwrdhdb.supabase.co'
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required')
  console.log('\nTo get your service role key:')
  console.log('1. Go to https://supabase.com/dashboard/project/ptjttzbtmyklfvwrdhdb/settings/api')
  console.log('2. Copy the "service_role" key (NOT the anon key)')
  console.log('3. Run: export SUPABASE_SERVICE_ROLE_KEY="your-key-here"')
  console.log('4. Then run this script again')
  process.exit(1)
}

// Create Supabase admin client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Test accounts to reset
const testAccounts = [
  { email: 'admin@example.com', password: 'Admin123' },
  { email: 'owner@example.com', password: 'Owner123' },
  { email: 'agent@example.com', password: 'Agent123' },
  { email: 'tenant@example.com', password: 'Tenant123' },
]

async function resetPasswords() {
  console.log('🔄 Resetting passwords using Supabase Admin API...\n')
  
  // First, get all users to find their IDs
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
  
  if (listError) {
    console.error('❌ Error listing users:', listError.message)
    process.exit(1)
  }
  
  console.log(`📋 Found ${users.length} total users in the system\n`)
  
  // Reset password for each test account
  for (const account of testAccounts) {
    const user = users.find(u => u.email === account.email)
    
    if (!user) {
      console.log(`⚠️  User not found: ${account.email} - skipping`)
      continue
    }
    
    console.log(`🔧 Resetting password for: ${account.email}`)
    console.log(`   User ID: ${user.id}`)
    
    try {
      const { data, error } = await supabase.auth.admin.updateUserById(
        user.id,
        { password: account.password }
      )
      
      if (error) {
        console.log(`   ❌ Failed: ${error.message}`)
      } else {
        console.log(`   ✅ Password set successfully`)
      }
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}`)
    }
    
    console.log('')
  }
  
  console.log('✅ Password reset complete!\n')
  console.log('📝 Test Credentials:')
  console.log('━'.repeat(50))
  testAccounts.forEach(acc => {
    console.log(`   ${acc.email.padEnd(25)} / ${acc.password}`)
  })
  console.log('━'.repeat(50))
  console.log('\n🌐 Login URL: https://bob-rentalz.vercel.app/login')
}

// Run the script
resetPasswords().catch(err => {
  console.error('❌ Unexpected error:', err)
  process.exit(1)
})
