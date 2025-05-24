"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Save, RotateCcw, CreditCard, Shield, TestTube, AlertCircle, CheckCircle } from "lucide-react"

export function PaymentSettings() {
  const [settings, setSettings] = useState({
    // Payment Providers
    stripeEnabled: true,
    stripePublicKey: "pk_test_...",
    stripeSecretKey: "sk_test_...",
    stripeWebhookSecret: "whsec_...",

    paypalEnabled: false,
    paypalClientId: "",
    paypalClientSecret: "",

    payfastEnabled: true,
    payfastMerchantId: "10000100",
    payfastMerchantKey: "46f0cd694581a",
    payfastPassphrase: "",

    // Commission & Fees
    platformCommission: 15, // percentage
    processingFee: 2.9, // percentage
    fixedFee: 0.3, // ZAR

    // Payout Settings
    payoutSchedule: "weekly",
    minimumPayout: 100, // ZAR

    // Refund Policy
    refundWindow: 24, // hours
    autoRefund: true,

    // Security
    fraudDetection: true,
    chargebackProtection: true,
    testMode: true,
  })

  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
    setHasChanges(false)
  }

  const testConnection = async (provider: string) => {
    // Simulate API test
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setTestResults((prev) => ({ ...prev, [provider]: Math.random() > 0.3 }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Payment Settings</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Configure payment processing and commission rates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setHasChanges(false)} disabled={!hasChanges}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {settings.testMode && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 dark:bg-yellow-900/20 dark:border-yellow-800">
          <div className="flex items-center gap-2">
            <TestTube className="w-4 h-4 text-yellow-600" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Test mode is enabled. No real transactions will be processed.
            </p>
          </div>
        </div>
      )}

      {/* Stripe Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Stripe
              {settings.stripeEnabled && <Badge variant="default">Enabled</Badge>}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => testConnection("stripe")}
                disabled={!settings.stripeEnabled}
              >
                <TestTube className="w-4 h-4 mr-2" />
                Test Connection
              </Button>
              {testResults.stripe !== undefined &&
                (testResults.stripe ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Stripe</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accept credit card payments via Stripe</p>
            </div>
            <Switch
              checked={settings.stripeEnabled}
              onCheckedChange={(checked) => handleChange("stripeEnabled", checked)}
            />
          </div>

          {settings.stripeEnabled && (
            <>
              <Separator />
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="stripePublicKey">Publishable Key</Label>
                  <Input
                    id="stripePublicKey"
                    value={settings.stripePublicKey}
                    onChange={(e) => handleChange("stripePublicKey", e.target.value)}
                    placeholder="pk_test_..."
                  />
                </div>
                <div>
                  <Label htmlFor="stripeSecretKey">Secret Key</Label>
                  <Input
                    id="stripeSecretKey"
                    type="password"
                    value={settings.stripeSecretKey}
                    onChange={(e) => handleChange("stripeSecretKey", e.target.value)}
                    placeholder="sk_test_..."
                  />
                </div>
                <div>
                  <Label htmlFor="stripeWebhookSecret">Webhook Secret</Label>
                  <Input
                    id="stripeWebhookSecret"
                    type="password"
                    value={settings.stripeWebhookSecret}
                    onChange={(e) => handleChange("stripeWebhookSecret", e.target.value)}
                    placeholder="whsec_..."
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* PayPal Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              PayPal
              {settings.paypalEnabled && <Badge variant="default">Enabled</Badge>}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => testConnection("paypal")}
                disabled={!settings.paypalEnabled}
              >
                <TestTube className="w-4 h-4 mr-2" />
                Test Connection
              </Button>
              {testResults.paypal !== undefined &&
                (testResults.paypal ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable PayPal</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accept payments via PayPal</p>
            </div>
            <Switch
              checked={settings.paypalEnabled}
              onCheckedChange={(checked) => handleChange("paypalEnabled", checked)}
            />
          </div>

          {settings.paypalEnabled && (
            <>
              <Separator />
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="paypalClientId">Client ID</Label>
                  <Input
                    id="paypalClientId"
                    value={settings.paypalClientId}
                    onChange={(e) => handleChange("paypalClientId", e.target.value)}
                    placeholder="PayPal Client ID"
                  />
                </div>
                <div>
                  <Label htmlFor="paypalClientSecret">Client Secret</Label>
                  <Input
                    id="paypalClientSecret"
                    type="password"
                    value={settings.paypalClientSecret}
                    onChange={(e) => handleChange("paypalClientSecret", e.target.value)}
                    placeholder="PayPal Client Secret"
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* PayFast Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              PayFast (South Africa)
              {settings.payfastEnabled && <Badge variant="default">Enabled</Badge>}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => testConnection("payfast")}
                disabled={!settings.payfastEnabled}
              >
                <TestTube className="w-4 h-4 mr-2" />
                Test Connection
              </Button>
              {testResults.payfast !== undefined &&
                (testResults.payfast ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable PayFast</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accept local South African payments</p>
            </div>
            <Switch
              checked={settings.payfastEnabled}
              onCheckedChange={(checked) => handleChange("payfastEnabled", checked)}
            />
          </div>

          {settings.payfastEnabled && (
            <>
              <Separator />
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="payfastMerchantId">Merchant ID</Label>
                  <Input
                    id="payfastMerchantId"
                    value={settings.payfastMerchantId}
                    onChange={(e) => handleChange("payfastMerchantId", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="payfastMerchantKey">Merchant Key</Label>
                  <Input
                    id="payfastMerchantKey"
                    type="password"
                    value={settings.payfastMerchantKey}
                    onChange={(e) => handleChange("payfastMerchantKey", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="payfastPassphrase">Passphrase (Optional)</Label>
                  <Input
                    id="payfastPassphrase"
                    type="password"
                    value={settings.payfastPassphrase}
                    onChange={(e) => handleChange("payfastPassphrase", e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Commission & Fees */}
      <Card>
        <CardHeader>
          <CardTitle>Commission & Fees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="platformCommission">Platform Commission (%)</Label>
              <Input
                id="platformCommission"
                type="number"
                step="0.1"
                value={settings.platformCommission}
                onChange={(e) => handleChange("platformCommission", Number.parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="processingFee">Processing Fee (%)</Label>
              <Input
                id="processingFee"
                type="number"
                step="0.1"
                value={settings.processingFee}
                onChange={(e) => handleChange("processingFee", Number.parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="fixedFee">Fixed Fee (ZAR)</Label>
              <Input
                id="fixedFee"
                type="number"
                step="0.01"
                value={settings.fixedFee}
                onChange={(e) => handleChange("fixedFee", Number.parseFloat(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payout Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Payout Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="payoutSchedule">Payout Schedule</Label>
              <select
                id="payoutSchedule"
                value={settings.payoutSchedule}
                onChange={(e) => handleChange("payoutSchedule", e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <Label htmlFor="minimumPayout">Minimum Payout (ZAR)</Label>
              <Input
                id="minimumPayout"
                type="number"
                value={settings.minimumPayout}
                onChange={(e) => handleChange("minimumPayout", Number.parseInt(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Fraud */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security & Fraud Protection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Fraud Detection</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enable automated fraud detection</p>
            </div>
            <Switch
              checked={settings.fraudDetection}
              onCheckedChange={(checked) => handleChange("fraudDetection", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Chargeback Protection</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enable chargeback protection services</p>
            </div>
            <Switch
              checked={settings.chargebackProtection}
              onCheckedChange={(checked) => handleChange("chargebackProtection", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Test Mode</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Use test environment for all transactions</p>
            </div>
            <Switch checked={settings.testMode} onCheckedChange={(checked) => handleChange("testMode", checked)} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
