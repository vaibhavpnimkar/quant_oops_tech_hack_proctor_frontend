import {
  Camera,
  LayoutDashboard,
  Settings2,
  FileSearch,
  Ban,
  UserCog2Icon,
  ShieldCheck,
  LucideMessagesSquare,
} from "lucide-react";
const features = [
  {
    name: "Live Proctoring",
    description: (
      <>
        Features real-time <strong>webcam and audio monitoring</strong>,
        capturing a live video feed and ambient sounds for identity verification
        and detection of irregularities. <br></br>
        <strong>Screen sharing</strong> functionality,{" "}
        <strong>browser activity</strong> monitoring, capturing and analysing{" "}
        <strong>keystroke logging</strong>, preventing unauthorized searches or
        access to websites ticks up high checkmarks for upholding proctored
        exams.
      </>
    ),
    icon: Camera,
  },
  {
    name: "Proctor Dashboard",
    description: (
      <>
        A comprehensive interface design providing proctors to{" "}
        <strong>view real-time data</strong> on exam progress and{" "}
        <strong>candidate behaviour</strong>.<br></br>Proctors can{" "}
        <strong>track each candidate status</strong> as they navigate through
        the assessment with the ability to{" "}
        <strong>intervene immediately</strong> on suspicious behaviour and take{" "}
        <strong>severe actions against the suspicious candidate</strong>{" "}
        facilitating efficient and effective proctoring.
      </>
    ),
    icon: LayoutDashboard,
  },
  {
    name: "Exam Setup and Configuration",
    description: (
      <>
        Tailor the hackathon environment by defining crucial parameters such as
        the{" "}
        <strong>
          hackathon title, designated duration, date and time of commencement,
          allowed resources
        </strong>
        , providing a framework for participants to understand the boundaries of
        the hackathon. <br></br>MedusaAI adapts to various{" "}
        <strong>hackathon types</strong>, specifying focus areas like{" "}
        <strong>
          MCQs, subjective QAs, data structures and software development
        </strong>{" "}
        ensuring evaluation criteria aligning with the objectives of the chosen
        category.
      </>
    ),
    icon: Settings2,
  },
  {
    name: "Analytics and Reporting",
    description: (
      <>
        This robust feature provides a comprehensive{" "}
        <strong>overview of exam performance</strong> with generation of{" "}
        <strong>
          detailed reports, granular analysis of candidate scores, completion
          rates
        </strong>{" "}
        and <strong>trends</strong> over time ensuring that the educators can
        derive valuable insights from the gathered data.<br></br>By{" "}
        <strong>analyzing historical data</strong>, administrators can{" "}
        <strong>identify patterns,</strong> pinpoint{" "}
        <strong>data-driven improvements</strong>, make{" "}
        <strong>informed decisions</strong> and enhance the overall efficacy
        ensuring fair and optimized examination process.
      </>
    ),
    icon: FileSearch,
  },
  {
    name: "Cheating Prevention",
    description: (
      <>
        This feature employs advanced technologies such as{" "}
        <strong>
          eye tracking, facial recognition, and behavior detection
        </strong>{" "}
        to effectively identify and flag instances of cheating. Facial
        recognition algorithms verify the identity of the test-taker and
        behavior detection analyzes actions and gestures, promptly{" "}
        <strong>flagging any irregularities</strong>.<br></br>Additionally, the
        administrators can view and{" "}
        <strong>flag each candidate manually</strong> via live proctoring stream
        upholding the credibility and fairness of online proctored examinations.
      </>
    ),
    icon: Ban,
  },
  // {
  //   name: "Technical Support",
  //   description: (
  //     <>
  //       The Technical Support feature addresses the critical need for{" "}
  //       <strong>immediate assistance</strong> in handling both{" "}
  //       <strong>technical and implementation issues</strong> ensuring the
  //       absence of any disruptions caused by technical glitches or
  //       implementation challenges. It provides{" "}
  //       <strong>virtual assistance</strong> in real-time, offering prompt
  //       solutions to both candidates and administrators facing any technical
  //       impediments during the examination process.
  //     </>
  //   ),
  //   icon: UserCog2Icon,
  // },
  {
    name: "Secure Environment",
    description: (
      <>
        Establishing a secure environment and disabling access to unauthorized
        resources throughout the examination duration is there to{" "}
        <strong>maintain the security</strong> and{" "}
        <strong>avoid data breaching</strong> by external affairs. The secure
        environment possess the capability to{" "}
        <strong>
          restrict the use of other applications, block access to external
          websites, and prevent the utilization of external devices
        </strong>
        , ensuring that candidates cannot seek unfair advantages or engage in
        dishonest practices.
      </>
    ),
    icon: ShieldCheck,
  },
  // {
  //   name: "Feedback Mechanism",
  //   description: "YooMAloo Has to add respective icons",
  //   icon: LucideMessagesSquare,
  // },
];

export const FeatureSection = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ultimate guardianship of the MAI realm.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600" id = "learn_more">
            MedusaAI(MAI) provides seamless proctored examination experience for
            organizers and candidates altogether. With vast features in the hand
            of organization we maintain high standards of integrity fortified by
            intelligent and manual surveillance.<br></br>
            <i>
              Explore some of our cutting-edge features like specification
              guided administrators, choosing examination type, providing
              technical support, data security and so much more.
            </i>
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl" >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16 ">
                <dt className="text-base font-semibold leading-7 text-gray-900 sm:text-2xl">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <feature.icon
                      className="h-8 w-8 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
