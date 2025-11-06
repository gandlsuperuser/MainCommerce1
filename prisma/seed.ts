import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create categories
  console.log('📁 Creating categories...')
  const tshirtsCategory = await prisma.category.upsert({
    where: { slug: 't-shirts' },
    update: {},
    create: {
      name: 'T-Shirts',
      slug: 't-shirts',
      description: 'Comfortable and stylish t-shirts for every occasion',
      image: '/images/c-tshirts.jpg',
    },
  })

  const jeansCategory = await prisma.category.upsert({
    where: { slug: 'jeans' },
    update: {},
    create: {
      name: 'Jeans',
      slug: 'jeans',
      description: 'Classic and modern jeans for all styles',
      image: '/images/c-jeans.jpg',
    },
  })

  const shoesCategory = await prisma.category.upsert({
    where: { slug: 'shoes' },
    update: {},
    create: {
      name: 'Shoes',
      slug: 'shoes',
      description: 'Comfortable and fashionable footwear',
      image: '/images/c-shoes.jpg',
    },
  })

  console.log('✅ Categories created')

  // Create users
  console.log('👤 Creating users...')
  const hashedPassword = await bcrypt.hash('password123', 10)

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@maincommerce.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@maincommerce.com',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@maincommerce.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'customer@maincommerce.com',
      password: hashedPassword,
      role: 'CUSTOMER',
      emailVerified: new Date(),
    },
  })

  const customerUser2 = await prisma.user.upsert({
    where: { email: 'jane@maincommerce.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane@maincommerce.com',
      password: hashedPassword,
      role: 'CUSTOMER',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Users created')

  // Create products - T-Shirts
  console.log('👕 Creating T-Shirt products...')
  const tshirt1 = await prisma.product.upsert({
    where: { id: 'tshirt-1' },
    update: {},
    create: {
      id: 'tshirt-1',
      name: 'Classic Cotton T-Shirt',
      description: 'Comfortable 100% cotton t-shirt perfect for everyday wear. Features a relaxed fit and soft fabric that gets better with every wash.',
      price: 29.99,
      images: ['/images/p11-1.jpg', '/images/p11-2.jpg'],
      stock: 50,
      featured: true,
      categoryId: tshirtsCategory.id,
    },
  })

  const tshirt2 = await prisma.product.upsert({
    where: { id: 'tshirt-2' },
    update: {},
    create: {
      id: 'tshirt-2',
      name: 'Premium V-Neck T-Shirt',
      description: 'Stylish v-neck t-shirt made from premium cotton blend. Perfect for layering or wearing on its own.',
      price: 34.99,
      images: ['/images/p12-1.jpg', '/images/p12-2.jpg'],
      stock: 35,
      featured: false,
      categoryId: tshirtsCategory.id,
    },
  })

  // Create products - Jeans
  console.log('👖 Creating Jeans products...')
  const jean1 = await prisma.product.upsert({
    where: { id: 'jean-1' },
    update: {},
    create: {
      id: 'jean-1',
      name: 'Classic Blue Jeans',
      description: 'Timeless blue jeans with a perfect fit. Made from durable denim that molds to your body over time.',
      price: 79.99,
      images: ['/images/p21-1.jpg', '/images/p21-2.jpg'],
      stock: 40,
      featured: true,
      categoryId: jeansCategory.id,
    },
  })

  const jean2 = await prisma.product.upsert({
    where: { id: 'jean-2' },
    update: {},
    create: {
      id: 'jean-2',
      name: 'Slim Fit Black Jeans',
      description: 'Modern slim fit black jeans for a sleek, contemporary look. Perfect for both casual and semi-formal occasions.',
      price: 89.99,
      images: ['/images/p22-1.jpg', '/images/p22-2.jpg'],
      stock: 30,
      featured: false,
      categoryId: jeansCategory.id,
    },
  })

  // Create products - Shoes
  console.log('👟 Creating Shoe products...')
  const shoe1 = await prisma.product.upsert({
    where: { id: 'shoe-1' },
    update: {},
    create: {
      id: 'shoe-1',
      name: 'Running Sneakers',
      description: 'Comfortable running sneakers with excellent cushioning and support. Perfect for daily workouts and casual wear.',
      price: 119.99,
      images: ['/images/p31-1.jpg', '/images/p31-2.jpg'],
      stock: 25,
      featured: true,
      categoryId: shoesCategory.id,
    },
  })

  const shoe2 = await prisma.product.upsert({
    where: { id: 'shoe-2' },
    update: {},
    create: {
      id: 'shoe-2',
      name: 'Casual Leather Shoes',
      description: 'Elegant casual leather shoes that combine style and comfort. Perfect for everyday wear and special occasions.',
      price: 149.99,
      images: ['/images/p32-1.jpg', '/images/p32-2.jpg'],
      stock: 20,
      featured: false,
      categoryId: shoesCategory.id,
    },
  })

  console.log('✅ Products created')

  console.log('🎉 Seed completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`   - 3 Categories created`)
  console.log(`   - 6 Products created`)
  console.log(`   - 3 Users created`)
  console.log('\n👤 Test Users:')
  console.log(`   Admin: admin@maincommerce.com / password123`)
  console.log(`   Customer: customer@maincommerce.com / password123`)
  console.log(`   Customer: jane@maincommerce.com / password123`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
