import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { jobType, country, city, urgency, budgetRange, description, name, email, phone } = body
    
    if (!jobType || !country || !city || !urgency || !budgetRange || !description || !name || !email || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Lead Intelligence: Classify based on budget
    let estimatedValue = 0
    let routingType = 'UNKNOWN'

    switch (budgetRange) {
      case 'Under €1,000':
        estimatedValue = 50
        routingType = 'SELL_LEAD'
        break
      case '€1,000 - €5,000':
        estimatedValue = 200
        routingType = 'PARTNER_MATCH'
        break
      case '€5,000 - €15,000':
        estimatedValue = 1000
        routingType = 'PARTNER_MATCH'
        break
      case '€15,000+':
        estimatedValue = 5000
        routingType = 'CLOSE_IN_HOUSE'
        break
      case 'Not sure yet':
        estimatedValue = 150
        routingType = 'UNKNOWN'
        break
    }

    // Lead Intelligence: Priority based on urgency
    const priority = urgency === 'As soon as possible' ? 'HIGH' : 'MEDIUM'

    const lead = await prisma.lead.create({
      data: {
        jobType,
        country,
        city,
        urgency,
        budgetRange,
        description,
        name,
        email,
        phone,
        estimatedValue,
        routingType,
        priority,
      },
    })
    
    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}
