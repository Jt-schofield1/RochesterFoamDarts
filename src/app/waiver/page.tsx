"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { FileText, AlertTriangle, Check, Shield, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SignaturePad from "@/components/SignaturePad"

const rules = [
  "Safety glasses must be worn at all times during play",
  "No shooting at faces or heads intentionally",
  "No physical contact with other players",
  "Listen to staff instructions at all times",
  "No modified blasters or darts allowed",
  "Report any injuries or concerns to staff immediately",
  "Respect all equipment and return it in good condition",
  "No running in designated safe zones",
  "Players must stay within designated play areas",
  "Have fun and play fair!",
]

const waiverText = `ASSUMPTION OF RISK AND WAIVER OF LIABILITY RELATING TO FOAM DART ACTIVITIES

In consideration of being permitted to participate in any way in Rochester Foam Dart League ("RFDL") activities, I hereby agree to the following:

1. ACKNOWLEDGMENT OF RISKS: I acknowledge that foam dart activities involve inherent risks, including but not limited to: physical contact with foam darts, projectiles, obstacles, other participants, and playing surfaces; falls, collisions, and impact injuries; eye injuries if safety equipment is not properly worn; muscle strains, sprains, and other physical injuries; and other risks inherent in physical recreational activities.

2. ASSUMPTION OF RISK: I knowingly and freely assume all such risks, both known and unknown, even if arising from the negligence of the releasees or others, and assume full responsibility for my participation.

3. WAIVER AND RELEASE: I, for myself and on behalf of my heirs, assigns, personal representatives and next of kin, HEREBY RELEASE, INDEMNIFY, AND HOLD HARMLESS Rochester Foam Dart League, its officers, officials, agents, employees, volunteers, other participants, sponsoring agencies, sponsors, advertisers, and if applicable, owners and lessors of premises used to conduct the event ("Releasees"), WITH RESPECT TO ANY AND ALL INJURY, DISABILITY, DEATH, or loss or damage to person or property, WHETHER ARISING FROM THE NEGLIGENCE OF THE RELEASEES OR OTHERWISE, to the fullest extent permitted by law.

4. MEDICAL AUTHORIZATION: I authorize RFDL staff to obtain emergency medical treatment for me/my child if necessary and agree to be responsible for any costs associated with such treatment.

5. PHOTO/VIDEO RELEASE: I grant RFDL permission to use photographs and/or video recordings of me/my child for promotional purposes, including social media, website, and marketing materials.

6. EQUIPMENT: I agree to use all equipment properly and return it in good condition. I agree to pay for any equipment that is lost, stolen, or damaged beyond normal wear and tear while in my possession.

7. RULES: I agree to abide by all rules and regulations of RFDL and to follow all instructions given by RFDL staff.

I HAVE READ THIS RELEASE OF LIABILITY AND ASSUMPTION OF RISK AGREEMENT, FULLY UNDERSTAND ITS TERMS, UNDERSTAND THAT I HAVE GIVEN UP SUBSTANTIAL RIGHTS BY SIGNING IT, AND SIGN IT FREELY AND VOLUNTARILY WITHOUT ANY INDUCEMENT.`

export default function WaiverPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    phone: "",
    email: "",
    event: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    guardianFirstName: "",
    guardianLastName: "",
    guardianPhone: "",
    guardianRelationship: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelationship: "",
    signature: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [isMinor, setIsMinor] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submittedAt, setSubmittedAt] = useState("")
  const printRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Check if person is a minor
    if (name === "birthdate" && value) {
      const birthDate = new Date(value)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      const isUnder18 = age < 18 || (age === 18 && monthDiff < 0)
      setIsMinor(isUnder18)
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSignatureChange = (signature: string) => {
    setFormData({ ...formData, signature })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!acceptTerms) {
      alert("Please accept the terms and conditions to continue.")
      return
    }
    
    if (!formData.signature) {
      alert("Please provide your signature to continue.")
      return
    }

    setIsSubmitting(true)

    const timestamp = new Date().toLocaleString()
    
    // Send to Formspree
    const form = new FormData()
    form.append("_subject", `New Waiver: ${formData.firstName} ${formData.lastName}${isMinor ? " (Minor)" : ""}`)
    form.append("Participant Name", `${formData.firstName} ${formData.lastName}`)
    form.append("Date of Birth", formData.birthdate)
    form.append("Phone", formData.phone)
    form.append("Email", formData.email)
    form.append("Event", formData.event || "General Registration")
    form.append("Address", `${formData.street}, ${formData.city}, ${formData.state} ${formData.zipCode}`)
    form.append("Is Minor", isMinor ? "Yes" : "No")
    
    if (isMinor) {
      form.append("Guardian Name", `${formData.guardianFirstName} ${formData.guardianLastName}`)
      form.append("Guardian Phone", formData.guardianPhone)
      form.append("Guardian Relationship", formData.guardianRelationship)
    }
    
    form.append("Emergency Contact", formData.emergencyName)
    form.append("Emergency Phone", formData.emergencyPhone)
    form.append("Emergency Relationship", formData.emergencyRelationship)
    form.append("Newsletter Opt-in", newsletter ? "Yes" : "No")
    form.append("Submitted At", timestamp)

    try {
      await fetch("https://formspree.io/f/mwpgnwvb", {
        method: "POST",
        body: form,
        headers: { Accept: "application/json" },
      })

      setSubmittedAt(timestamp)
      setSubmitted(true)
    } catch (error) {
      console.error("Error:", error)
      alert("There was an error submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (submitted) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Banner - Hidden on print */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 print:hidden"
          >
            <Card className="bg-green-500/20 border-green-500/50">
              <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/20 rounded-full">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-green-400">WAIVER SUBMITTED!</h2>
                    <p className="text-white/70 font-sans text-sm">Print or save this page for your records</p>
                  </div>
                </div>
                <Button onClick={handlePrint} className="gap-2">
                  <Printer className="w-4 h-4" />
                  Print / Save PDF
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Printable Waiver Document */}
          <div ref={printRef} className="bg-white text-black rounded-lg p-8 print:p-0 print:rounded-none">
            {/* Header */}
            <div className="text-center border-b-2 border-black pb-6 mb-6">
              <h1 className="text-3xl font-bold mb-2">ROCHESTER FOAM DART LEAGUE</h1>
              <h2 className="text-xl font-semibold">LIABILITY WAIVER & RELEASE FORM</h2>
              <p className="text-sm text-gray-600 mt-2">75 Barrett Drive P.O. Box 65, Webster, NY 14580 | (585) 748-8087</p>
            </div>

            {/* Submission Info */}
            <div className="bg-gray-100 p-4 rounded-lg mb-6 print:bg-gray-100">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Date Signed:</strong> {submittedAt}</div>
                <div><strong>Event:</strong> {formData.event || "General"}</div>
              </div>
            </div>

            {/* Participant Information */}
            <div className="mb-6">
              <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">PARTICIPANT INFORMATION</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                <div><strong>Date of Birth:</strong> {formData.birthdate}</div>
                <div><strong>Phone:</strong> {formData.phone}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div className="col-span-2"><strong>Address:</strong> {formData.street}, {formData.city}, {formData.state} {formData.zipCode}</div>
              </div>
            </div>

            {/* Guardian Information (if minor) */}
            {isMinor && (
              <div className="mb-6">
                <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">PARENT/GUARDIAN INFORMATION</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Name:</strong> {formData.guardianFirstName} {formData.guardianLastName}</div>
                  <div><strong>Phone:</strong> {formData.guardianPhone}</div>
                  <div><strong>Relationship:</strong> {formData.guardianRelationship}</div>
                </div>
              </div>
            )}

            {/* Emergency Contact */}
            <div className="mb-6">
              <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">EMERGENCY CONTACT</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Name:</strong> {formData.emergencyName}</div>
                <div><strong>Phone:</strong> {formData.emergencyPhone}</div>
                <div><strong>Relationship:</strong> {formData.emergencyRelationship}</div>
              </div>
            </div>

            {/* Waiver Text */}
            <div className="mb-6">
              <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">WAIVER & RELEASE OF LIABILITY</h3>
              <div className="text-xs leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded border max-h-64 overflow-y-auto print:max-h-none print:overflow-visible">
                {waiverText}
              </div>
            </div>

            {/* Agreement & Signature */}
            <div className="mb-6">
              <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">AGREEMENT & SIGNATURE</h3>
              <div className="space-y-3 text-sm mb-6">
                <p className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  I have read and accept the rules, terms, and liability waiver above.
                </p>
                <p className="flex items-center gap-2">
                  {newsletter ? <Check className="w-5 h-5 text-green-600" /> : <span className="w-5 h-5 border rounded" />}
                  Newsletter opt-in: {newsletter ? "Yes" : "No"}
                </p>
              </div>
              
              {/* Signature Display */}
              <div className="border-2 border-black p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">
                  {isMinor ? "Parent/Guardian Signature:" : "Participant Signature:"}
                </p>
                {formData.signature && (
                  <div className="bg-white border rounded p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={formData.signature} 
                      alt="Digital Signature" 
                      className="max-h-24 mx-auto"
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Digitally signed on {submittedAt}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 border-t pt-4 mt-8">
              <p>This is a legal document. Please retain a copy for your records.</p>
              <p className="mt-1">Rochester Foam Dart League | Foam Dart Nation Est. 2015</p>
            </div>
          </div>

          {/* Print Button (bottom) - Hidden on print */}
          <div className="mt-8 text-center print:hidden">
            <Button onClick={handlePrint} size="lg" className="gap-2">
              <Printer className="w-5 h-5" />
              Print / Save as PDF
            </Button>
            <p className="text-white/60 text-sm mt-2">
              Tip: Choose &quot;Save as PDF&quot; in the print dialog to save a digital copy
            </p>
          </div>
        </div>

        {/* Print Styles */}
        <style jsx global>{`
          @media print {
            body {
              background: white !important;
              color: black !important;
            }
            .print\\:hidden {
              display: none !important;
            }
            nav, footer {
              display: none !important;
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pictures/image (6).png"
            alt="Waiver"
            fill
            className="object-cover"
            priority
          />
          <div className="hero-gradient absolute inset-0" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex p-4 bg-dart-red/20 rounded-2xl mb-6">
              <FileText className="w-12 h-12 text-dart-red" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              WAIVER
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-sans">
              All participants must complete this waiver before joining any Rochester Foam Dart League event.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Rules Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
          id="rules"
        >
          <Card className="bg-card border-border">
            <CardHeader className="bg-dart-charcoal border-b border-border">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-dart-red" />
                <CardTitle className="text-2xl">RULES & SAFETY</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/80 font-sans">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-dart-red/20 text-dart-red text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.section>

        {/* Waiver Text Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
          id="waiver-text"
        >
          <Card className="bg-card border-border">
            <CardHeader className="bg-dart-charcoal border-b border-border">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-dart-yellow" />
                <CardTitle className="text-2xl">LIABILITY WAIVER</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-dart-charcoal rounded-lg p-6 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-white/80 font-sans text-sm leading-relaxed">
                  {waiverText}
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Form Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="form"
        >
          <Card className="bg-card border-border">
            <CardHeader className="bg-dart-charcoal border-b border-border">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-dart-red" />
                <CardTitle className="text-2xl">DIGITAL WAIVER FORM</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Participant Information */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-dart-red text-white text-sm font-bold flex items-center justify-center">1</span>
                    Participant Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthdate">Date of Birth *</Label>
                      <Input
                        id="birthdate"
                        name="birthdate"
                        type="date"
                        value={formData.birthdate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="event">Event / Location</Label>
                      <Select onValueChange={(value) => handleSelectChange("event", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event or location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rochester-weekly">Rochester Weekly Games</SelectItem>
                          <SelectItem value="buffalo-weekly">Buffalo Weekly Games</SelectItem>
                          <SelectItem value="syracuse-weekly">Syracuse Weekly Games</SelectItem>
                          <SelectItem value="private-party">Private Party</SelectItem>
                          <SelectItem value="special-event">Special Event</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Guardian Information (if minor) */}
                {isMinor && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-2 border-dart-yellow/50 rounded-lg p-6 bg-dart-yellow/5"
                  >
                    <h3 className="text-xl font-bold text-dart-yellow mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Parent/Guardian Information (Required for Minors)
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="guardianFirstName">Guardian First Name *</Label>
                        <Input
                          id="guardianFirstName"
                          name="guardianFirstName"
                          value={formData.guardianFirstName}
                          onChange={handleChange}
                          required={isMinor}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guardianLastName">Guardian Last Name *</Label>
                        <Input
                          id="guardianLastName"
                          name="guardianLastName"
                          value={formData.guardianLastName}
                          onChange={handleChange}
                          required={isMinor}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guardianPhone">Guardian Phone *</Label>
                        <Input
                          id="guardianPhone"
                          name="guardianPhone"
                          type="tel"
                          value={formData.guardianPhone}
                          onChange={handleChange}
                          required={isMinor}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guardianRelationship">Relationship to Participant *</Label>
                        <Select onValueChange={(value) => handleSelectChange("guardianRelationship", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="legal-guardian">Legal Guardian</SelectItem>
                            <SelectItem value="grandparent">Grandparent</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Address */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-dart-red text-white text-sm font-bold flex items-center justify-center">2</span>
                    Address
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="street">Street Address *</Label>
                      <Input
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-dart-red text-white text-sm font-bold flex items-center justify-center">3</span>
                    Emergency Contact
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyName">Contact Name *</Label>
                      <Input
                        id="emergencyName"
                        name="emergencyName"
                        value={formData.emergencyName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Contact Phone *</Label>
                      <Input
                        id="emergencyPhone"
                        name="emergencyPhone"
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyRelationship">Relationship *</Label>
                      <Select onValueChange={(value) => handleSelectChange("emergencyRelationship", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Signature */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-dart-red text-white text-sm font-bold flex items-center justify-center">4</span>
                    Digital Signature
                  </h3>
                  <p className="text-white/70 font-sans text-sm mb-4">
                    {isMinor 
                      ? "Parent/Guardian: By signing below, you confirm that you are the legal parent or guardian of the minor participant and agree to the terms above on their behalf."
                      : "By signing below, you confirm that you have read and agree to the terms above."
                    }
                  </p>
                  <SignaturePad onSignatureChange={handleSignatureChange} />
                </div>

                {/* Agreement Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="acceptTerms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="acceptTerms" className="text-white/80 font-sans cursor-pointer">
                      I have read and accept the rules, terms, and liability waiver above. I understand that foam dart activities involve inherent risks and I voluntarily assume those risks. *
                    </Label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="newsletter"
                      checked={newsletter}
                      onCheckedChange={(checked) => setNewsletter(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="newsletter" className="text-white/80 font-sans cursor-pointer">
                      Sign me up for the newsletter to receive updates about events, giveaways, and new gear reviews (1-2 emails per month).
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || !acceptTerms || !formData.signature}
                >
                  {isSubmitting ? "Submitting..." : "Submit Waiver"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}

