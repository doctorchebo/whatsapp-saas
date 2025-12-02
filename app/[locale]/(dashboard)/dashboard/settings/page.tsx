"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [rules, setRules] = useState([
    { id: 1, trigger: "hello", response: "Hi there! How can I help?" },
    { id: 2, trigger: "pricing", response: "Our pricing starts at $99/month" },
  ]);
  const [newRule, setNewRule] = useState({ trigger: "", response: "" });

  const handleAddRule = () => {
    if (newRule.trigger && newRule.response) {
      setRules([...rules, { id: Date.now(), ...newRule }]);
      setNewRule({ trigger: "", response: "" });
    }
  };

  const handleDeleteRule = (id: number) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  return (
    <div className="space-y-6 p-4 lg:p-8">
      <div>
        <h1 className="text-lg lg:text-2xl font-medium">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Configure your WhatsApp automation and integration settings
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Update your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Display Name</Label>
            <Input id="name" placeholder="Your name" defaultValue="John Doe" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              defaultValue="john@example.com"
            />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Settings</CardTitle>
          <CardDescription>
            Configure WhatsApp and other integrations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">
                WhatsApp Integration
              </h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="twilio-account">Twilio Account SID</Label>
                  <Input
                    id="twilio-account"
                    placeholder="Your Twilio Account SID"
                    type="password"
                  />
                </div>
                <div>
                  <Label htmlFor="twilio-token">Twilio Auth Token</Label>
                  <Input
                    id="twilio-token"
                    placeholder="Your Twilio Auth Token"
                    type="password"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
                  <Input id="whatsapp-number" placeholder="+1234567890" />
                </div>
              </div>
            </div>
            <Separator />
            <Button variant="outline">Test Connection</Button>
          </div>
        </CardContent>
      </Card>

      {/* Automation Rules Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
          <CardDescription>
            Create rules for automatic message responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Rule Form */}
          <div className="border rounded-lg p-4 space-y-4 bg-muted/20">
            <h3 className="font-semibold text-sm">Add New Rule</h3>
            <div>
              <Label htmlFor="trigger">Trigger Keyword</Label>
              <Input
                id="trigger"
                placeholder="e.g., 'hello', 'pricing', 'demo'"
                value={newRule.trigger}
                onChange={(e) =>
                  setNewRule({ ...newRule, trigger: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="response">Automatic Response</Label>
              <Input
                id="response"
                placeholder="e.g., 'Hi there! How can I help?'"
                value={newRule.response}
                onChange={(e) =>
                  setNewRule({ ...newRule, response: e.target.value })
                }
              />
            </div>
            <Button onClick={handleAddRule} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>

          {/* Rules List */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Current Rules</h3>
            {rules.length > 0 ? (
              <div className="space-y-2">
                {rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-start justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        Trigger:{" "}
                        <code className="bg-muted px-2 py-1 rounded text-xs">
                          {rule.trigger}
                        </code>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Response: {rule.response}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No rules created yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>Enable or disable features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">LLM Emotion Analysis</p>
              <p className="text-xs text-muted-foreground">
                Analyze sentiment in incoming messages
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Auto Response</p>
              <p className="text-xs text-muted-foreground">
                Enable automatic responses for matched rules
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Message Notifications</p>
              <p className="text-xs text-muted-foreground">
                Receive notifications for new messages
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
