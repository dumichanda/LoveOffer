"use client"

import { useState } from "react"
import { HelpCircle, MessageSquare, Phone, Mail, Search, ChevronRight, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function HelpSupport() {
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    category: "",
    priority: "medium",
  })

  // Static FAQ data to avoid store dependencies
  const faqItems = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create my first date offer?",
          answer:
            "Go to the Create tab, fill in your offer details, add photos, set your price, and choose available time slots. Make sure to write a compelling description!",
        },
        {
          question: "How does the booking process work?",
          answer:
            "Browse offers, like the ones you're interested in, then book a specific time slot. Payment is made offline and confirmed in the app.",
        },
        {
          question: "What verification options are available?",
          answer:
            "You can verify your email, phone, identity (ID document), photo, and background check. Higher verification levels increase trust and booking rates.",
        },
      ],
    },
    {
      category: "Safety & Security",
      questions: [
        {
          question: "How do I stay safe on dates?",
          answer:
            "Always meet in public places, tell someone where you're going, use our safety check-in feature, and trust your instincts. See our Safety Center for more tips.",
        },
        {
          question: "What should I do if I feel unsafe?",
          answer:
            "Use our emergency features to contact your emergency contacts, call 112, or report the issue to our support team immediately.",
        },
        {
          question: "How are users verified?",
          answer:
            "We offer multiple verification levels including email, phone, photo verification, ID verification, and background checks for premium users.",
        },
      ],
    },
    {
      category: "Payments & Billing",
      questions: [
        {
          question: "How do payments work?",
          answer:
            "Payments are made directly between users offline (cash, EFT, card). The platform only processes subscription payments for premium features.",
        },
        {
          question: "What are the cancellation policies?",
          answer:
            "Flexible: Free cancellation 24h before. Moderate: Free 48h before, 50% refund 24h before. Strict: Free 72h before, no refund after.",
        },
        {
          question: "How do refunds work?",
          answer:
            "Since payments are made offline between users, refunds are handled directly between the parties according to the agreed cancellation policy.",
        },
      ],
    },
    {
      category: "Technical Issues",
      questions: [
        {
          question: "The app is running slowly, what should I do?",
          answer:
            "Try refreshing the page, clearing your browser cache, or restarting the app. If issues persist, contact our technical support.",
        },
        {
          question: "I'm not receiving notifications",
          answer:
            "Check your notification settings in your profile, ensure notifications are enabled in your browser/device settings.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "Contact our support team to request account deletion. Note that this action is permanent and cannot be undone.",
        },
      ],
    },
  ]

  // Filter FAQ items based on search query
  const filteredFAQ = faqItems
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  const handleCreateTicket = () => {
    if (newTicket.subject && newTicket.description && newTicket.category) {
      // In a real app, this would create a support ticket
      console.log("Creating support ticket:", newTicket)
      setNewTicket({ subject: "", description: "", category: "", priority: "medium" })
      setShowNewTicket(false)
      // Show success message
      alert("Support ticket created successfully! We'll get back to you soon.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Live Chat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Get instant help</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <CardContent className="p-6 text-center">
            <Mail className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Email Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">support@mavuso.co.za</p>
          </CardContent>
        </Card>
      </div>

      {/* Support Tickets */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <HelpCircle className="w-5 h-5 text-purple-500" />
              Support Tickets
            </CardTitle>
            <Button size="sm" onClick={() => setShowNewTicket(true)}>
              New Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <HelpCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">No support tickets yet</p>
            <Button onClick={() => setShowNewTicket(true)}>Create Your First Ticket</Button>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Search */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>

          <div className="space-y-6">
            {filteredFAQ.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">{category.category}</h3>
                <div className="space-y-3">
                  {category.questions.map((faq, faqIndex) => (
                    <details key={faqIndex} className="group">
                      <summary className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="p-3 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border-l-2 border-blue-500">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {searchQuery && filteredFAQ.length === 0 && (
            <div className="text-center py-6">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400">No FAQ items found for "{searchQuery}"</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">Still need help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-200">
              <Mail className="w-4 h-4" />
              <span>support@mavuso.co.za</span>
            </div>
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-200">
              <Phone className="w-4 h-4" />
              <span>+27 11 123 4567</span>
            </div>
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-200">
              <MessageSquare className="w-4 h-4" />
              <span>Live Chat (9AM - 5PM)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Ticket Dialog */}
      <Dialog open={showNewTicket} onOpenChange={setShowNewTicket}>
        <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Create Support Ticket</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-900 dark:text-white">Category</Label>
                <Select
                  value={newTicket.category}
                  onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                >
                  <SelectTrigger className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <SelectItem value="technical" className="text-gray-900 dark:text-white">
                      Technical Issue
                    </SelectItem>
                    <SelectItem value="billing" className="text-gray-900 dark:text-white">
                      Billing & Payments
                    </SelectItem>
                    <SelectItem value="safety" className="text-gray-900 dark:text-white">
                      Safety Concern
                    </SelectItem>
                    <SelectItem value="general" className="text-gray-900 dark:text-white">
                      General Question
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-900 dark:text-white">Priority</Label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                >
                  <SelectTrigger className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <SelectItem value="low" className="text-gray-900 dark:text-white">
                      Low
                    </SelectItem>
                    <SelectItem value="medium" className="text-gray-900 dark:text-white">
                      Medium
                    </SelectItem>
                    <SelectItem value="high" className="text-gray-900 dark:text-white">
                      High
                    </SelectItem>
                    <SelectItem value="urgent" className="text-gray-900 dark:text-white">
                      Urgent
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-gray-900 dark:text-white">Subject</Label>
              <Input
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                placeholder="Brief description of your issue"
                className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <Label className="text-gray-900 dark:text-white">Description</Label>
              <Textarea
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                placeholder="Please provide as much detail as possible..."
                className="mt-1 min-h-[120px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowNewTicket(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleCreateTicket}
                disabled={!newTicket.subject || !newTicket.description || !newTicket.category}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
