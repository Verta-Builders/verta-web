"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Target,
    Users,
    Briefcase,
    Palette,
    Award,
    Globe,
    Search,
    Send,
    Loader2,
    CheckCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { sendStrategyEmail } from "@/lib/actions/email";

interface Question {
    id: string;
    label: string;
    placeholder: string;
    isTextArea?: boolean;
}

interface Section {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
    questions: Question[];
}

const sections: Section[] = [
    {
        id: "strategy",
        title: "1. BUSINESS STRATEGY & POSITIONING",
        icon: <Target className="w-6 h-6" />,
        description: "Να ορίσουμε την 'φωνή' και τη μοναδικότητα του brand σας.",
        questions: [
            { id: "identity_3_words", label: "Η ταυτότητά σας σε 3 λέξεις", placeholder: "π.χ. Ενσυναίσθηση, Επιστημονικότητα, Ειλικρίνεια" },
            { id: "footprint", label: "Το αποτύπωμά σας", placeholder: "Πώς θέλετε να σας περιγράφουν οι θεραπευόμενοι μετά από 6 μήνες συνεργασίας;" },
            { id: "therapeutic_approach", label: "Θεραπευτική προσέγγιση", placeholder: "π.χ. CBT, Συστημική, Προσωποκεντρική κ.λπ." },
            { id: "usp", label: "Unique Selling Point", placeholder: "Τι θεωρείτε ότι σας ξεχωρίζει από άλλους συναδέλφους σας;" },
            { id: "ideal_case", label: "Ιδανικό περιστατικό", placeholder: "Ποιο είναι το προφίλ του ανθρώπου που μπορείτε να βοηθήσετε περισσότερο;" },
            { id: "negative_audience", label: "Negative Target Audience", placeholder: "Ποιο κοινό αισθάνεστε ότι δεν ταιριάζει με τη μέθοδό σας;" }
        ]
    },
    {
        id: "psychology",
        title: "2. CLIENT PSYCHOLOGY",
        icon: <Users className="w-6 h-6" />,
        description: "Να χτίσουμε περιεχόμενο που 'μιλάει' στην καρδιά του προβλήματος.",
        questions: [
            { id: "top_5_problems", label: "Ποιες είναι οι συχνότερες αιτίες που κάποιος σας επισκέπτεται;", placeholder: "Ποιες είναι οι συχνότερες αιτίες που κάποιος σας επισκέπτεται;" },
            { id: "biggest_fear", label: "Η μεγαλύτερη φοβία", placeholder: "Τι ανησυχεί κάποιον πριν το πρώτο ραντεβού; (π.χ. κριτική, κόστος, έκθεση)" },
            { id: "obstacles", label: "Εμπόδια", placeholder: "Τι τους σταματάει συνήθως από το να πάρουν την απόφαση να ξεκινήσουν;" },
            { id: "the_after", label: "Το 'Μετά'", placeholder: "Ποιο είναι το επιθυμητό συναίσθημα του θεραπευόμενου μετά από 3 μήνες συνεδριών;" }
        ]
    },
    {
        id: "services",
        title: "3. SERVICES STRUCTURE",
        icon: <Briefcase className="w-6 h-6" />,
        description: "Η σαφής παρουσίαση των υπηρεσιών σας.",
        questions: [
            { id: "services_details", label: "Υπηρεσίες", placeholder: "Υπηρεσία - Σε ποιον απευθύνεται; - Διάρκεια - Κόστος", isTextArea: true },
            { id: "delivery_mode", label: "Τρόπος Διεξαγωγής", placeholder: "Online, Δια ζώσης ή Υβριδικά;" },
            { id: "result_expectation", label: "Προσδοκία Αποτελέσματος", placeholder: "Ποιο είναι ένα ρεαλιστικό χρονικό διάστημα για τα πρώτα αποτελέσματα;" }
        ]
    },
    {
        id: "branding",
        title: "4. BRAND PERSONALITY & VISUAL DIRECTION",
        icon: <Palette className="w-6 h-6" />,
        description: "Η οπτική επικοινωνία της αισθητικής σας.",
        questions: [
            { id: "brand_archetype", label: "Brand Archetype", placeholder: "Ποιο σας εκφράζει περισσότερο; (Ο Φροντιστής, ο Σοφός, ο Εξερευνητής;)" },
            { id: "visual_style", label: "Visual Style", placeholder: "Προτιμάτε κάτι minimal, ζεστό/earthy, ή αυστηρά επαγγελματικό;" },
            { id: "colors", label: "Χρώματα", placeholder: "Υπάρχουν χρώματα που αγαπάτε ή που θέλετε οπωσδήποτε να αποφύγουμε;" },
            { id: "photography", label: "Φωτογραφικό υλικό", placeholder: "Διαθέτετε επαγγελματική φωτογράφιση; (Ναι/Όχι)" }
        ]
    },
    {
        id: "credibility",
        title: "5. AUTHORITY & CREDIBILITY",
        icon: <Award className="w-6 h-6" />,
        description: "Η ενίσχυση της εμπιστοσύνης.",
        questions: [
            { id: "academic_background", label: "Ακαδημαϊκό Υπόβαθρο", placeholder: "Πτυχία, Μεταπτυχιακά, Πιστοποιήσεις", isTextArea: true },
            { id: "legal_info", label: "Νομικά Στοιχεία", placeholder: "Αριθμός Άδειας Ασκήσεως Επαγγέλματος (για το footer του site)." },
            { id: "social_proof", label: "Social Proof", placeholder: "Διαθέτετε Testimonials ή Google Reviews που μπορούμε να χρησιμοποιήσουμε;" }
        ]
    },
    {
        id: "digital",
        title: "6. DIGITAL STRATEGY & OPERATIONS",
        icon: <Globe className="w-6 h-6" />,
        description: "Η λειτουργικότητα του site.",
        questions: [
            { id: "appointment_goals", label: "Στόχοι Ραντεβού", placeholder: "Πόσα νέα ραντεβού ανά μήνα είναι ο στόχος σας;" },
            { id: "features", label: "Features", placeholder: "Online Booking, Blog, Newsletter, Lead Magnet κ.λπ." },
            { id: "seo_keywords", label: "SEO Keywords", placeholder: "5-10 λέξεις-κλειδιά που θα θέλατε να σας βρίσκουν" },
            { id: "contact_details", label: "Στοιχεία Επικοινωνίας", placeholder: "Διεύθυνση, Ωράριο, Τηλέφωνο, Email, Social Media links", isTextArea: true }
        ]
    },
    {
        id: "competitors",
        title: "7. COMPETITOR ANALYSIS",
        icon: <Search className="w-6 h-6" />,
        description: "Ανάλυση ανταγωνισμού.",
        questions: [
            { id: "sites_liked", label: "Sites που σας αρέσουν", placeholder: "Link + γιατί", isTextArea: true },
            { id: "sites_disliked", label: "Sites που ΔΕΝ σας αρέσουν", placeholder: "Link + γιατί", isTextArea: true }
        ]
    }
];

// Utility to strip Greek accents
const stripAccents = (text: string) => {
    return text.replace(/[άΆ]/g, 'Α')
        .replace(/[έΈ]/g, 'Ε')
        .replace(/[ήΉ]/g, 'Η')
        .replace(/[ίΊΪΐ]/g, 'Ι')
        .replace(/[όΌ]/g, 'Ο')
        .replace(/[ύΎΫΰ]/g, 'Υ')
        .replace(/[ώΏ]/g, 'Ω');
};

export default function StrategyPage() {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true });

    const handleChange = (id: string, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("submitting");

        try {
            // Format data for email
            const formattedSections = sections.map(section => ({
                title: section.title,
                questions: section.questions.map(q => ({
                    label: q.label,
                    answer: formData[q.id] || ""
                }))
            }));

            const result = await sendStrategyEmail({ sections: formattedSections });

            if (result.success) {
                setFormState("success");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setFormState("error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setFormState("error");
        }
    };

    return (
        <div className="bg-dark-950 min-h-screen text-white selection:bg-white/10">
            <Navigation />

            <main className="relative pt-40 pb-20 px-6 lg:px-12 mx-auto max-w-screen-2xl">
                {/* Background Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '100px 100px'
                    }}
                />

                {/* Hero Section */}
                <section ref={headerRef} className="mb-32 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Soft Glow behind Hero */}
                        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

                        <div className="flex justify-between items-start mb-12 relative z-10">
                            <div className="max-w-4xl">
                                <span className="text-xs text-dark-400 uppercase tracking-[0.5em] mb-6 block font-medium">
                                    Strategic Analysis & Brand Identity
                                </span>
                                <h1 className="text-5xl lg:text-8xl font-display font-medium text-white mb-10 leading-[1.1] tracking-tight drop-shadow-2xl">
                                    Strategy <br />
                                    <span className="text-dark-500 italic">Framework</span>
                                </h1>
                                <p className="text-dark-300 text-xl lg:text-2xl font-light leading-relaxed max-w-2xl font-display drop-shadow-sm">
                                    Αγαπητή συνεργάτιδα, οι παρακάτω ερωτήσεις θα μας βοηθήσουν να κατανοήσουμε το όραμά σας και να δημιουργήσουμε μια ιστοσελίδα που αντικατοπτρίζει απόλυτα την επαγγελματική σας ταυτότητα.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Questionnaire Form */}
                <form onSubmit={handleSubmit} className="relative z-10">
                    <div className="space-y-48 lg:space-y-64">
                        {sections.map((section, idx) => (
                            <SectionBlock
                                key={section.id}
                                section={section}
                                idx={idx}
                                formData={formData}
                                onChange={handleChange}
                            />
                        ))}
                    </div>

                    {/* Submit Button Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-64 pt-32 border-t border-white/5 flex flex-col items-center justify-center text-center relative"
                    >
                        {/* Glow behind final section */}
                        <div className="absolute inset-0 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

                        <h3 className="text-4xl font-display font-medium text-white mb-8 relative z-10">ΟΛΟΚΛΗΡΩΣΑΤΕ;</h3>
                        <p className="text-dark-400 mb-16 max-w-md text-lg relative z-10">
                            Ελέγξτε τις απαντήσεις σας και στείλτε μας το ερωτηματολόγιο για να ξεκινήσουμε τη δουλειά.
                        </p>

                        <button
                            type="submit"
                            disabled={formState === "submitting" || formState === "success"}
                            className="group relative flex items-center gap-8 px-16 py-8 rounded-full bg-white text-dark-950 font-bold overflow-hidden transition-all active:scale-95 disabled:opacity-50 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)]"
                        >
                            <span className="relative z-10 uppercase tracking-widest text-sm">
                                {formState === "idle" && "SUBMIT FORM"}
                                {formState === "submitting" && "SENDING..."}
                                {formState === "success" && "SUCCESSFULLY SENT"}
                                {formState === "error" && "TRY AGAIN"}
                            </span>
                            <div className="relative z-10">
                                {formState === "idle" && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                {formState === "submitting" && <Loader2 className="w-5 h-5 animate-spin" />}
                                {formState === "success" && <CheckCircle className="w-5 h-5" />}
                            </div>
                            <div className="absolute inset-0 bg-dark-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </motion.div>
                </form>
            </main>

            <Footer />
        </div>
    );
}

function SectionBlock({ section, idx, formData, onChange }: {
    section: Section,
    idx: number,
    formData: Record<string, string>,
    onChange: (id: string, value: string) => void
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="grid lg:grid-cols-[450px_1fr] gap-20 lg:gap-32 relative"
        >
            {/* Ambient Section Glow */}
            <div className="absolute -inset-20 bg-white/[0.01] rounded-[100px] blur-[80px] pointer-events-none" />

            <div className="lg:sticky lg:top-40 self-start relative z-10">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-dark-900 border border-white/5 shadow-2xl flex items-center justify-center text-white">
                        {section.icon}
                    </div>
                    <span className="text-sm text-dark-500 font-mono tracking-widest uppercase font-medium">SECTION 0{idx + 1}</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-display font-medium text-white mb-8 tracking-tight drop-shadow-lg">
                    {stripAccents(section.title.toUpperCase())}
                </h2>
                <p className="text-dark-400 font-light text-lg lg:text-xl leading-relaxed">
                    {section.description}
                </p>
            </div>

            <div className="grid md:grid-cols-1 gap-16 relative z-10">
                {section.questions.map((q: Question) => (
                    <div key={q.id} className="group relative">
                        <label htmlFor={q.id} className="block text-xs text-dark-500 uppercase tracking-[0.3em] mb-2 group-focus-within:text-white font-medium transition-colors">
                            {stripAccents(q.label.toUpperCase())}
                        </label>
                        <p className="text-dark-400 text-sm mb-6 font-light leading-relaxed max-w-xl group-focus-within:text-dark-300 transition-colors">
                            {q.placeholder}
                        </p>
                        {q.isTextArea ? (
                            <textarea
                                id={q.id}
                                value={formData[q.id] || ""}
                                onChange={(e) => onChange(q.id, e.target.value)}
                                rows={4}
                                className="w-full bg-white/[0.02] backdrop-blur-sm border-b border-white/10 px-6 py-6 text-white text-xl lg:text-2xl font-light focus:border-white outline-none transition-all resize-none rounded-t-xl"
                            />
                        ) : (
                            <input
                                id={q.id}
                                type="text"
                                value={formData[q.id] || ""}
                                onChange={(e) => onChange(q.id, e.target.value)}
                                className="w-full bg-white/[0.02] backdrop-blur-sm border-b border-white/10 px-6 py-6 text-white text-xl lg:text-2xl font-light focus:border-white outline-none transition-all rounded-t-xl"
                            />
                        )}
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-focus-within:w-full" />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
