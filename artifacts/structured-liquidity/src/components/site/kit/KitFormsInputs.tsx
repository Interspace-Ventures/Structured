import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Autocomplete } from "@/components/ui/autocomplete";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import {
  Form,
  FormField,
  FormLabel,
  FormError,
  FormSuccess,
  FormDescription,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { InputOTP } from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import {
  Command,
  CommandTrigger,
  CommandContent,
  CommandInput,
  CommandLabel,
  CommandItem,
} from "@/components/ui/command";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { NumberField } from "@/components/ui/number-field";
import { Fieldset, Legend } from "@/components/ui/fieldset";

export function KitFormsInputs() {
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [agreeErr, setAgreeErr] = useState(false);
  const [ok, setOk] = useState(false);
  const [sliderVal, setSliderVal] = useState(60);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validEmail = /.+@.+\..+/.test(email);
    setEmailErr(!validEmail);
    setAgreeErr(!agree);
    setOk(validEmail && agree);
  };

  return (
    <div className="kit-group reveal">
      <div className="kit-group-head"><span className="kg-name">Forms &amp; inputs</span><span className="kg-rule"></span><span className="kg-count">Autocomplete · Checkbox · Form · Input · OTP · Select · Switch</span></div>
      <div className="kit-grid">

        <div className="glass kit-cell w6">
          <span className="kit-cap">Autocomplete</span>
          <Autocomplete
            placeholder={"Search a token… (try “acc”)"}
            suggestions={[
              "--accent",
              "--accent-ink",
              "--glass-blur",
              "--glass-alpha",
              "--glass-tint",
              "--radius",
              "--border-w",
              "--hard-x",
              "--display",
            ]}
          />
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Checkbox group</span>
          <CheckboxGroup
            role="group"
            aria-label="Surfaces to enable"
            label="Surfaces to enable"
            description="Pick one or more surface treatments."
            options={[
              { label: "Glass", defaultChecked: true },
              { label: "Solid", defaultChecked: true },
              { label: "Liquid" },
            ]}
          />
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Form</span>
          <Form onSubmit={onSubmit} noValidate>
            <FormField invalid={emailErr}>
              <FormLabel>Work email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="you@studio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormError data-err hidden={!emailErr}>Enter a valid email address.</FormError>
            </FormField>
            <Checkbox data-agree checked={agree} onCheckedChange={setAgree}>
              I agree to the terms
            </Checkbox>
            <FormError data-agree-err hidden={!agreeErr}>Please accept the terms to continue.</FormError>
            <div className="kit-row" style={{ justifyContent: "space-between", alignItems: "center", gap: "0.8rem" }}>
              <button className="sl-btn default" type="submit"><ArrowRight />Create account</button>
              <FormSuccess data-ok hidden={!ok}>Account created.</FormSuccess>
            </div>
          </Form>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Label</span>
          <div className="kit-col" style={{ gap: "0.85rem" }}>
            <Label>Default label</Label>
            <Label>Required label<span className="lb-req">*</span></Label>
            <Label>Optional label<span className="lb-opt">optional</span></Label>
            <Label className="lb-disabled">Disabled label</Label>
          </div>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Checkbox</span>
          <div className="kit-col">
            <Checkbox defaultChecked>Liquid glass surfaces</Checkbox>
            <Checkbox>Flat shadows</Checkbox>
            <Checkbox defaultChecked>Sharp 90° corners</Checkbox>
          </div>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Input OTP</span>
          <InputOTP length={6} defaultValue="420" />
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Input · label · textarea</span>
          <div className="kit-col">
            <Label>Email</Label>
            <Input type="email" placeholder="you@studio.com" />
            <Label>Message</Label>
            <Textarea placeholder="Tell us about the build…"></Textarea>
          </div>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Progress · skeleton</span>
          <Progress value={68} />
          <div className="kit-row" style={{ gap: "0.7rem", width: "100%", flexWrap: "nowrap" }}>
            <Skeleton style={{ width: "44px", height: "44px" }} />
            <div className="kit-col" style={{ flex: 1, gap: "0.45rem" }}>
              <Skeleton style={{ height: "11px", width: "70%" }} />
              <Skeleton style={{ height: "11px", width: "45%" }} />
            </div>
          </div>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Skeleton · card</span>
          <div className="kit-col" style={{ gap: "0.7rem", width: "100%" }} aria-hidden="true">
            <Skeleton style={{ height: "96px", width: "100%" }} />
            <Skeleton style={{ height: "13px", width: "80%" }} />
            <Skeleton style={{ height: "11px", width: "100%" }} />
            <Skeleton style={{ height: "11px", width: "55%" }} />
          </div>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Skeleton · text</span>
          <div className="kit-col" style={{ gap: "0.55rem", width: "100%" }} aria-hidden="true">
            <Skeleton style={{ height: "9px", width: "35%" }} />
            <Skeleton style={{ height: "16px", width: "72%" }} />
            <Skeleton style={{ height: "11px", width: "100%" }} />
            <Skeleton style={{ height: "11px", width: "92%" }} />
            <Skeleton style={{ height: "11px", width: "64%" }} />
          </div>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Skeleton · list</span>
          <div className="kit-col" style={{ gap: "0.7rem", width: "100%" }} aria-hidden="true">
            <div className="kit-row" style={{ gap: "0.7rem", width: "100%", flexWrap: "nowrap", alignItems: "center" }}>
              <Skeleton style={{ width: "32px", height: "32px", flex: "none" }} />
              <div className="kit-col" style={{ flex: 1, gap: "0.4rem" }}>
                <Skeleton style={{ height: "10px", width: "60%" }} />
                <Skeleton style={{ height: "10px", width: "38%" }} />
              </div>
            </div>
            <div className="kit-row" style={{ gap: "0.7rem", width: "100%", flexWrap: "nowrap", alignItems: "center" }}>
              <Skeleton style={{ width: "32px", height: "32px", flex: "none" }} />
              <div className="kit-col" style={{ flex: 1, gap: "0.4rem" }}>
                <Skeleton style={{ height: "10px", width: "72%" }} />
                <Skeleton style={{ height: "10px", width: "46%" }} />
              </div>
            </div>
            <div className="kit-row" style={{ gap: "0.7rem", width: "100%", flexWrap: "nowrap", alignItems: "center" }}>
              <Skeleton style={{ width: "32px", height: "32px", flex: "none" }} />
              <div className="kit-col" style={{ flex: 1, gap: "0.4rem" }}>
                <Skeleton style={{ height: "10px", width: "54%" }} />
                <Skeleton style={{ height: "10px", width: "32%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Radio group</span>
          <RadioGroup defaultValue="dark">
            <RadioGroupItem value="dark">Dark mode</RadioGroupItem>
            <RadioGroupItem value="light">Light mode</RadioGroupItem>
            <RadioGroupItem value="system">System</RadioGroupItem>
          </RadioGroup>
        </div>

        <div className="glass kit-cell w6">
          <span className="kit-cap">Select</span>
          <Select>
            <SelectTrigger placeholder="Choose a surface" />
            <SelectContent>
              <SelectItem value="Glass">Glass</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Solid">Solid</SelectItem>
              <SelectItem value="Flat">Flat</SelectItem>
            </SelectContent>
          </Select>
          <span className="kit-cap" style={{ marginTop: "0.6rem" }}>Command / combobox</span>
          <Command>
            <CommandTrigger>Search commands…</CommandTrigger>
            <CommandContent style={{ minWidth: "220px" }}>
              <CommandInput placeholder="Type a command…" />
              <CommandLabel>Suggestions</CommandLabel>
              <CommandItem>New file</CommandItem>
              <CommandItem>Open project</CommandItem>
              <CommandItem>Toggle theme</CommandItem>
              <CommandItem>Export tokens</CommandItem>
              <CommandItem>Copy CSS variables</CommandItem>
            </CommandContent>
          </Command>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Switch · slider</span>
          <div className="kit-row" style={{ justifyContent: "space-between" }}>
            <span className="mono" style={{ fontSize: "0.8rem" }}>Notifications</span>
            <Switch defaultChecked />
          </div>
          <div className="kit-row" style={{ justifyContent: "space-between" }}>
            <span className="mono" style={{ fontSize: "0.8rem" }}>Reduced motion</span>
            <Switch />
          </div>
          <div className="kit-row" style={{ gap: "0.8rem" }}>
            <Slider defaultValue={60} onValueChange={setSliderVal} />
            <span className="mono" style={{ fontSize: "0.78rem", color: "var(--ink-dim)" }}><span data-slider-out>{sliderVal}</span>%</span>
          </div>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Number field</span>
          <NumberField defaultValue={3} min={0} max={99} step={1} aria-label="Quantity" />
          <span className="mono" style={{ fontSize: "0.72rem", color: "var(--ink-dim)", marginTop: "0.55rem" }}>Steppers or ↑ ↓ arrow keys</span>
        </div>

        <div className="glass kit-cell w4">
          <span className="kit-cap">Fieldset</span>
          <Fieldset>
            <Legend>Billing address</Legend>
            <FormField>
              <Label>City</Label>
              <Input placeholder="San Francisco" />
            </FormField>
            <FormField>
              <Label>Postal code</Label>
              <Input placeholder="94103" />
            </FormField>
          </Fieldset>
        </div>

      </div>
    </div>
  );
}
